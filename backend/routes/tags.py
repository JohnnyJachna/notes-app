from fastapi import APIRouter, Response, Depends
from sqlmodel import Session, select
from db import get_session

from models.note import Tag, TagRead

router = APIRouter()

@router.get("", response_model=list[TagRead])
async def get_tags(set_id: int, session: Session = Depends(get_session)):
  statement = select(Tag).where(Tag.set_id == set_id)
  result = session.exec(statement).all()
  return result

@router.post("/add", response_model=Tag)
async def add_tag(set_id: int, payload: Tag, session: Session = Depends(get_session)):
  new_tag = Tag(
    name = payload.name,
    color = payload.color,
    set_id = payload.set_id
  )
  
  session.add(new_tag)
  session.commit()
  session.refresh(new_tag)
  return new_tag

@router.patch("", response_model=TagRead)
async def update_tag_name(set_id: int, payload: Tag, session: Session = Depends(get_session)):
  tag = session.get(Tag, payload.id)

  updated_data = payload.model_dump(exclude_unset=True)
  for key, value in updated_data.items():
    setattr(tag, key, value)

  session.add(tag)
  session.commit()
  session.refresh(tag)
  return tag

@router.delete("/{tag_id}")
def delete_tag(set_id: int, tag_id: int, response: Response, session: Session = Depends(get_session)):
  tag = session.get(Tag, tag_id)
  if tag is None:
    response.status_code = 404
    return "Tag not found"
  
  session.delete(tag)
  session.commit()
  return {"message" : f"Tag with id: {tag_id} deleted"}