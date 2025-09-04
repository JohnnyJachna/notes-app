from fastapi import APIRouter, Response, Depends
from sqlmodel import Session, select
from db import get_session

from models.note import Source, SourceRead

router = APIRouter()

@router.get("", response_model=list[SourceRead])
async def get_sources(set_id: int, session: Session = Depends(get_session)):
  statement = select(Source).where(Source.set_id == set_id)
  result = session.exec(statement).all()
  return result

@router.post("/add", response_model=Source)
async def add_source(set_id: int, session: Session = Depends(get_session)):
  new_source = Source(
    name = "New Source",
    color= "#F8E61B",
    set_id = set_id,
    title = "",
    authors = "",
    publishers = "",
    pages = "",
    publish_date = "",
    update_date = "",
    access_date = ""
  )
  
  session.add(new_source)
  session.commit()
  session.refresh(new_source)
  return new_source

@router.patch("", response_model = SourceRead)
async def update_source_name(set_id: int, payload: SourceRead, session: Session = Depends(get_session)):
  source = session.get(Source, payload.id)

  updated_data = payload.model_dump(exclude_unset=True)
  for key, value in updated_data.items():
    setattr(source, key, value)

  session.add(source)
  session.commit()
  session.refresh(source)
  return source

@router.delete("/{source_id}")
def delete_source(set_id: int, source_id: int, response: Response, session: Session = Depends(get_session)):
  source = session.get(Source, source_id)
  if source is None:
    response.status_code = 404
    return "Source not found"
  
  session.delete(source)
  session.commit()
  return {"message" : f"Source with id: {source_id} deleted"}