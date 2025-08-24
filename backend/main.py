import uvicorn
import datetime
from typing import List

from fastapi import FastAPI, Response, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from db import get_session
from utils.sanitizer import sanitize_html
from utils.auth import authenticate_and_get_user_details

from models.set import Set
from models.note import Note, Source, Tag, NoteRead, TagRead, SourceRead, NotePositionUpdate

def get_datetime():
  current_datetime = datetime.datetime.now()
  return current_datetime.strftime("%c")

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
	  allow_headers=['*']
)

@app.get("/")
async def root():
  return {"message": "Home Page"}

# ----- SETS ROUTES ------

@app.get("/sets", response_model=list[Set])
async def get_sets(request: Request, session: Session = Depends(get_session)):
  user_details = authenticate_and_get_user_details(request)
  user_id = user_details.get("user_id")

  statement = select(Set).where(Set.user_id == user_id)
  result = session.exec(statement).all()
  return result

@app.post("/sets/add", response_model=Set)
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

@app.patch("/sets", response_model = Set)
async def update_set_name(payload: Set, session: Session = Depends(get_session)):
  set = session.get(Set, payload.id)

  updated_data = payload.model_dump(exclude_unset=True)
  for key, value in updated_data.items():
    setattr(set, key, value)

  session.add(set)
  session.commit()
  session.refresh(set)
  return set


@app.delete("/sets/{set_id}")
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

# ----- NOTES ROUTES -----

@app.get("/sets/{set_id}/notes", response_model=list[NoteRead])
async def get_notes(set_id: int, session: Session = Depends(get_session)):
  statement = select(Note).where(Note.set_id == set_id)
  result = session.exec(statement).all()
  return result

@app.post("/sets/{set_id}/notes/add", response_model=NoteRead)
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

@app.patch("/sets/{set_id}/notes", response_model=NoteRead)
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

@app.patch("/notes/positions")
async def update_notes_positions(payload: List[NotePositionUpdate], session: Session = Depends(get_session)):
    for item in payload:
        note = session.get(Note, item.id)
        if note:
            note.position = item.position

    session.add_all([session.get(Note, item.id) for item in payload])
    session.commit()
    
    return {"message": "Note positions updated successfully."}

@app.delete("/sets/{set_id}/notes/{note_id}")
def delete_note(set_id: int, note_id: int, response: Response, session: Session = Depends(get_session)):
  note = session.get(Note, note_id)
  if set is None:
    response.status_code = 404
    return "Note not found"
  
  session.delete(note)
  session.commit()
  return {"message" : f"Note with id: {note_id} deleted"}

# ----- TAGS ROUTES -----

@app.get("/sets/{set_id}/tags", response_model=list[TagRead])
async def get_tags(set_id: int, session: Session = Depends(get_session)):
  statement = select(Tag).where(Tag.set_id == set_id)
  result = session.exec(statement).all()
  return result

@app.post("/sets/{set_id}/tags/add", response_model=Tag)
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

@app.patch("/sets/{set_id}/tags", response_model=TagRead)
async def update_tag_name(set_id: int, payload: Tag, session: Session = Depends(get_session)):
  tag = session.get(Tag, payload.id)

  updated_data = payload.model_dump(exclude_unset=True)
  for key, value in updated_data.items():
    setattr(tag, key, value)

  session.add(tag)
  session.commit()
  session.refresh(tag)
  return tag

@app.delete("/sets/{set_id}/tags/{tag_id}")
def delete_tag(set_id: int, tag_id: int, response: Response, session: Session = Depends(get_session)):
  tag = session.get(Tag, tag_id)
  if tag is None:
    response.status_code = 404
    return "Tag not found"
  
  session.delete(tag)
  session.commit()
  return {"message" : f"Tag with id: {tag_id} deleted"}

# ----- SOURCES ROUTES -----

@app.get("/sets/{set_id}/sources", response_model=list[SourceRead])
async def get_sources(set_id: int, session: Session = Depends(get_session)):
  statement = select(Source).where(Source.set_id == set_id)
  result = session.exec(statement).all()
  return result

@app.post("/sets/{set_id}/sources/add", response_model=Source)
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

@app.patch("/sets/{set_id}/sources", response_model = SourceRead)
async def update_source_name(set_id: int, payload: SourceRead, session: Session = Depends(get_session)):
  source = session.get(Source, payload.id)

  updated_data = payload.model_dump(exclude_unset=True)
  for key, value in updated_data.items():
    setattr(source, key, value)

  session.add(source)
  session.commit()
  session.refresh(source)
  return source

@app.delete("/sets/{set_id}/sources/{source_id}")
def delete_source(set_id: int, source_id: int, response: Response, session: Session = Depends(get_session)):
  source = session.get(Source, source_id)
  if source is None:
    response.status_code = 404
    return "Source not found"
  
  session.delete(source)
  session.commit()
  return {"message" : f"Source with id: {source_id} deleted"}

if __name__ == '__main__':
  uvicorn.run('main:app', host='localhost', port=8000, reload=True)