import uvicorn
import datetime

from fastapi import FastAPI, Response, Depends
from sqlmodel import Session, select
from db import get_session

from models.set import Set
from models.note import Note, Source, Tag
from models.links import LinkTagNote, LinkSourceNote

def get_datetime():
  current_datetime = datetime.datetime.now()
  return current_datetime.strftime("%c")

app = FastAPI()

@app.get("/")
async def root():
  return {"message": "Home Page"}

# ----- SETS ROUTES ------

@app.get("/sets", response_model=list[Set])
async def get_sets(session: Session = Depends(get_session)):
  statement = select(Set)
  result = session.exec(statement).all()
  return result

@app.get("/sets/{set_id}", response_model=Set)
def get_single_set(set_id: int, response: Response, session: Session = Depends(get_session)):
  set = session.get(Set, set_id)
  if set is None:
    response.status_code = 404
    return "Set not found"
  
  return set

@app.post("/sets/add", response_model=Set)
async def add_set(session: Session = Depends(get_session)):
  new_set = Set(
    name="New Set",
    create_date= f"{get_datetime()}",
    update_date= f"{get_datetime()}"
  )
  
  session.add(new_set)
  session.commit()
  session.refresh(new_set)
  return {"message": f"New set: {new_set}"}

@app.delete("/sets/{set_id}")
def delete_set(set_id: int, response: Response, session: Session = Depends(get_session)):
  set = session.get(Set, set_id)
  if set is None:
    response.status_code = 404
    return "Set not found"
  
  session.delete(set)
  session.commit()
  return {"message" : f"Set with id: {set_id} deleted"}

# ----- NOTES ROUTES -----

@app.get("/sets/{set_id}/notes", response_model=list[Note])
async def get_notes(set_id: int, session: Session = Depends(get_session)):
  statement = select(Note).where(Note.set_id == set_id)
  result = session.exec(statement).all()
  return result

@app.get("/sets/notes/{note_id}", response_model=Note)
def get_single_note(notes_id: int, response: Response, session: Session = Depends(get_session)):
  note = session.get(Note, notes_id)
  if note is None:
    response.status_code = 404
    return "Note not found"
  
  return note

@app.post("/sets/notes/add", response_model=Note)
async def add_note(set_id: int, session: Session = Depends(get_session)):

  new_note = Note(
    name="New Note",
    header="Header",
    content="Content",
    create_date= f"{get_datetime()}",
    update_date= f"{get_datetime()}",
    set_id= set_id
  )
  
  session.add(new_note)
  session.commit()
  session.refresh(new_note)
  return {"message": f"New note: {new_note}"}

@app.delete("/sets/notes/{note_id}")
def delete_note(note_id: int, response: Response, session: Session = Depends(get_session)):
  note = session.get(Note, note_id)
  if set is None:
    response.status_code = 404
    return "Note not found"
  
  session.delete(note)
  session.commit()
  return {"message" : f"Note with id: {note_id} deleted"}

# ----- TAGS ROUTES -----

@app.get("/sets/{set_id}/tags", response_model=list[Tag])
async def get_tags(set_id: int, session: Session = Depends(get_session)):
  statement = select(Tag).where(Tag.set_id == set_id)
  result = session.exec(statement).all()
  return result

@app.get("/sets/tags/{tag_id}", response_model=Tag)
def get_single_tag(tag_id: int, response: Response, session: Session = Depends(get_session)):
  tag = session.get(Tag, tag_id)
  if tag is None:
    response.status_code = 404
    return "Tag not found"
  
  return tag

@app.post("/sets/tags/add", response_model=Tag)
async def add_tag(set_id: int, session: Session = Depends(get_session)):
  new_tag = Tag(
    name="New Tag",
    set_id= set_id
  )
  
  session.add(new_tag)
  session.commit()
  session.refresh(new_tag)
  return {"message": f"New tag: {new_tag}"}

@app.delete("/sets/tags/{tag_id}")
def delete_tag(tag_id: int, response: Response, session: Session = Depends(get_session)):
  tag = session.get(Tag, tag_id)
  if tag is None:
    response.status_code = 404
    return "Tag not found"
  
  session.delete(tag)
  session.commit()
  return {"message" : f"Tag with id: {tag_id} deleted"}

# ----- SOURCES ROUTES -----

@app.get("/sets/{set_id}/sources", response_model=list[Source])
async def get_sources(set_id: int, session: Session = Depends(get_session)):
  statement = select(Source).where(Source.set_id == set_id)
  result = session.exec(statement).all()
  return result

@app.get("/sets/sources/{source_id}", response_model=Source)
def get_single_source(source_id: int, response: Response, session: Session = Depends(get_session)):
  source = session.get(Source, source_id)
  if source is None:
    response.status_code = 404
    return "Source not found"
  
  return source

@app.post("/sets/sources/add", response_model=Source)
async def add_source(set_id: int, session: Session = Depends(get_session)):
  new_source = Source(
    name="New Source",
    set_id= set_id
  )
  
  session.add(new_source)
  session.commit()
  session.refresh(new_source)
  return {"message": f"New source: {new_source}"}

@app.delete("/sets/sources/{source_id}")
def delete_source(source_id: int, response: Response, session: Session = Depends(get_session)):
  source = session.get(Source, source_id)
  if source is None:
    response.status_code = 404
    return "Source not found"
  
  session.delete(source)
  session.commit()
  return {"message" : f"Source with id: {source_id} deleted"}

# ----- NOTES TAGS ROUTES -----

@app.get("/sets/notes/{note_id}/tags", response_model=list[Tag])
async def get_notes_tags(note_id: int, session: Session = Depends(get_session)):
  note = session.exec(select(Note).where(Note.id == note_id)).one()
  tags = note.tags
  return tags

@app.post("/sets/notes/{note_id}/tags/add", response_model=Note)
async def add_tag_to_note(note_id: int, tag_id: int, session: Session = Depends(get_session)):
  note = session.exec(select(Note).where(Note.id == note_id)).one()
  tag = session.exec(select(Tag).where(Tag.id == tag_id)).one()

  note.tags.append(tag)
  session.add(note)
  session.commit()
  session.refresh(note)

  return note

@app.delete("/sets/notes/{note_id}/tags/{tag_id}")
def delete_tag_from_note(note_id: int, tag_id: int, session: Session = Depends(get_session)):
  note = session.exec(select(Note).where(Note.id == note_id)).one()
  tag = session.exec(select(Tag).where(Tag.id == tag_id)).one()
  
  note.tags.remove(tag)
  session.commit()
  return {"message" : f"Source with id: {tag_id} deleted"}

# ----- NOTES SOURCES ROUTES -----

@app.get("/sets/notes/{note_id}/sources", response_model=list[Source])
async def get_notes_sources(note_id: int, session: Session = Depends(get_session)):
  note = session.exec(select(Note).where(Note.id == note_id)).one()
  sources = note.sources
  return sources

@app.post("/sets/notes/{note_id}/sources/add", response_model=Note)
async def add_source_to_note(note_id: int, source_id: int, session: Session = Depends(get_session)):
  note = session.exec(select(Note).where(Note.id == note_id)).one()
  source = session.exec(select(Source).where(Source.id == source_id)).one()

  note.sources.append(source)
  session.add(note)
  session.commit()

  return {"message": f"Source: {source_id} added to Note: {note_id}"}

@app.delete("/sets/notes/{note_id}/sources/{source_id}")
def delete_source_from_note(note_id: int, source_id: int, session: Session = Depends(get_session)):
  note = session.exec(select(Note).where(Note.id == note_id)).one()
  source = session.exec(select(Source).where(Source.id == source_id)).one()
  
  note.sources.remove(source)
  session.commit()
  return {"message" : f"Source with id: {source_id} deleted"}

if __name__ == '__main__':
  uvicorn.run('main:app', host='localhost', port=8000, reload=True)