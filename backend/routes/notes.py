from typing import List

from fastapi import APIRouter, Response, Depends, Request
from sqlmodel import Session, select
from db import get_session
from utils.sanitizer import sanitize_html

from models.note import Note, NotePositionUpdate, NoteRead, Tag, Source

router = APIRouter()

@router.get("", response_model=list[NoteRead])
async def get_notes(set_id: int, session: Session = Depends(get_session)):
  statement = select(Note).where(Note.set_id == set_id)
  result = session.exec(statement).all()
  return result

@router.post("/add", response_model=NoteRead)
async def add_note(set_id: int, payload: Note,session: Session = Depends(get_session)):

  new_note = Note(
    header=payload.header,
    content=payload.content,
    create_date=payload.create_date,
    update_date=payload.update_date,
    set_id=payload.set_id,
    color=payload.color,
    position=payload.position,
  )
  
  session.add(new_note)
  session.commit()
  session.refresh(new_note)
  return new_note

@router.patch("", response_model=NoteRead)
async def update_note_data(set_id: int, payload: NoteRead, session: Session = Depends(get_session)):
    note = session.get(Note, payload.id)

    note.header = payload.header
    note.content = sanitize_html(payload.content)
    note.update_date = payload.update_date
    note.color = payload.color
    
    # https://docs.sqlalchemy.org/en/20/core/operators.html#in-comparisons
    # Create a new list of tag ids from the payload, then select all Tags with that id
    
    if payload.tags is not None:
        tags = session.exec(select(Tag).where(Tag.id.in_([t.id for t in payload.tags]))).all()
        note.tags = tags
        
    if payload.sources is not None:
        sources = session.exec(select(Source).where(Source.id.in_([s.id for s in payload.sources]))).all()
        note.sources = sources

    session.add(note)
    session.commit()
    session.refresh(note)
    return note

@router.patch("/positions")
async def update_notes_positions(payload: List[NotePositionUpdate], session: Session = Depends(get_session)):
    for item in payload:
        note = session.get(Note, item.id)
        if note:
            note.position = item.position

    session.add_all([session.get(Note, item.id) for item in payload])
    session.commit()
    
    return {"message": "Note positions updated successfully."}

@router.delete("/{note_id}")
def delete_note(set_id: int, note_id: int, response: Response, session: Session = Depends(get_session)):
  note = session.get(Note, note_id)
  if set is None:
    response.status_code = 404
    return "Note not found"
  
  session.delete(note)
  session.commit()
  return {"message" : f"Note with id: {note_id} deleted"}