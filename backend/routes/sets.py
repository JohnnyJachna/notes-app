from fastapi import APIRouter, Response, Depends, Request
from sqlmodel import Session, select
from db import get_session
from utils.auth import authenticate_and_get_user_details

from models.set import Set
from models.note import Source, Tag

router = APIRouter()

@router.get("", response_model=list[Set])
async def get_sets(request: Request, session: Session = Depends(get_session)):
  user_details = authenticate_and_get_user_details(request)
  user_id = user_details.get("user_id")

  statement = select(Set).where(Set.user_id == user_id)
  result = session.exec(statement).all()
  return result

@router.post("/add", response_model=Set)
async def add_set(payload: Set, request: Request, session: Session = Depends(get_session)):
  user_details = authenticate_and_get_user_details(request)
  user_id = user_details.get("user_id")

  new_set = Set(
    name=payload.name,
    create_date=payload.create_date,
    update_date=payload.update_date,
    user_id = user_id,
  )
  
  session.add(new_set)
  session.commit()
  session.refresh(new_set)
  return new_set

@router.patch("", response_model = Set)
async def update_set_name(payload: Set, session: Session = Depends(get_session)):
  set = session.get(Set, payload.id)

  updated_data = payload.model_dump(exclude_unset=True)
  for key, value in updated_data.items():
    setattr(set, key, value)

  session.add(set)
  session.commit()
  session.refresh(set)
  return set


@router.delete("/{set_id}")
def delete_set(set_id: int, response: Response, session: Session = Depends(get_session)):
  set = session.get(Set, set_id)
  if set is None:
    response.status_code = 404
    return "Set not found"

# Probably a better way to do this, but have to remove tags and sources first 
# to get rid of many to many reletationship with notes
  tags = session.exec(select(Tag).where(Tag.set_id == set_id)).all()
  sources = session.exec(select(Source).where(Source.set_id == set_id)).all()

  for tag in tags:
    session.delete(tag)

  for source in sources:
    session.delete(source)
  
  session.commit()
  session.delete(set)
  session.commit()
  return {"message" : f"Set with id: {set_id} deleted"}