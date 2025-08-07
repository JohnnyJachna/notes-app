import uvicorn
import datetime

from fastapi import FastAPI, Response, Depends
from sqlmodel import Session, select
from db import get_session

from models.set import Sets
from models.note import Notes
from models.tag import Tags
from models.source import Sources
from models.link_tag_note import LinkTagNote
from models.link_source_note import LinkSourceNote

def get_datetime():
  current_datetime = datetime.datetime.now()
  return current_datetime.strftime("%c")

app = FastAPI()

@app.get("/")
async def root():
  return {"message": "Home Page"}

# ----- SETS ROUTES ------

@app.get("/sets")
async def get_sets(session: Session = Depends(get_session)):
  statement = select(Sets)
  result = session.exec(statement).all()
  return result

@app.get("/sets/{sets_id}")
def get_single_set(sets_id: int, response: Response, session: Session = Depends(get_session)):
  set = session.get(Sets, sets_id)
  if set is None:
    response.status_code = 404
    return "Set not found"
  
  return set

@app.post("/sets/add")
async def add_set(session: Session = Depends(get_session)):
  new_set = Sets(
    name="New Set",
    create_date= f"{get_datetime()}",
    update_date= f"{get_datetime()}"
  )
  
  session.add(new_set)
  session.commit()
  session.refresh(new_set)
  return {"message": f"New set: {new_set}"}

@app.delete("/sets/{sets_id}")
def delete_set(sets_id: int, response: Response, session: Session = Depends(get_session)):
  set = session.get(Sets, sets_id)
  if set is None:
    response.status_code = 404
    return "Set not found"
  
  session.delete(set)
  session.commit()
  return {"message" : f"Set with id: {sets_id} deleted"}

# ----- NOTES ROUTES -----

@app.get("/sets/{sets_id}/notes")
async def get_notes(sets_id: int, response: Response, session: Session = Depends(get_session)):
  set = session.exec(select(Sets).where(Sets.id == sets_id)).one()
  
  statement = select(Notes).where(Notes.set_id == set.id)
  result = session.exec(statement).all()
  return result

@app.get("/sets/notes/{notes_id}")
def get_single_note(notes_id: int, response: Response, session: Session = Depends(get_session)):
  note = session.get(Notes, notes_id)
  if note is None:
    response.status_code = 404
    return "Note not found"
  
  return note

@app.post("/sets/notes/add")
async def add_note(sets_id: int, response: Response, session: Session = Depends(get_session)):

  new_note = Notes(
    name="New Note",
    header="Header",
    content="Content",
    create_date= f"{get_datetime()}",
    update_date= f"{get_datetime()}",
    set_id= sets_id
  )
  
  session.add(new_note)
  session.commit()
  session.refresh(new_note)
  return {"message": f"New note: {new_note}"}

@app.delete("/sets/notes/{notes_id}")
def delete_note(notes_id: int, response: Response, session: Session = Depends(get_session)):
  note = session.get(Notes, notes_id)
  if set is None:
    response.status_code = 404
    return "Note not found"
  
  session.delete(note)
  session.commit()
  return {"message" : f"Note with id: {notes_id} deleted"}

# ----- TAGS ROUTES -----

@app.get("/sets/{sets_id}/tags")
async def get_tags(sets_id: int, session: Session = Depends(get_session)):
  set = session.exec(select(Sets).where(Sets.id == sets_id)).one()

  statement = select(Tags).where(Tags.set_id == set.id)
  result = session.exec(statement).all()
  return result

@app.get("/sets/tags/{tags_id}")
def get_single_tag(tags_id: int, response: Response, session: Session = Depends(get_session)):
  tag = session.get(Tags, tags_id)
  if tag is None:
    response.status_code = 404
    return "Tag not found"
  
  return tag

@app.post("/sets/tags/add")
async def add_tag(sets_id: int, session: Session = Depends(get_session)):
  new_tag = Tags(
    name="New Tag",
    set_id= sets_id
  )
  
  session.add(new_tag)
  session.commit()
  session.refresh(new_tag)
  return {"message": f"New tag: {new_tag}"}

@app.post("/sets/notes/tags/add")
async def add_tag_to_note(tags_id: int, notes_id: int, session: Session = Depends(get_session)):
  new_link = LinkTagNote(
    tag_id= tags_id,
    note_id= notes_id
  )

  session.add(new_link)
  session.commit()
  session.refresh(new_link)
  return {"message": f"Tag: {tags_id} added to Note: {notes_id}"}

@app.delete("/sets/tags/{tags_id}")
def delete_tag(tags_id: int, response: Response, session: Session = Depends(get_session)):
  tag = session.get(Tags, tags_id)
  if tag is None:
    response.status_code = 404
    return "Tag not found"
  
  session.delete(tag)
  session.commit()
  return {"message" : f"Tag with id: {tags_id} deleted"}

# ----- SOURCES ROUTES -----

@app.get("/sets/{sets_id}/sources")
async def get_sources(sets_id: int, session: Session = Depends(get_session)):
  set = session.exec(select(Sets).where(Sets.id == sets_id)).one()

  statement = select(Sources).where(Sources.set_id == set.id)
  result = session.exec(statement).all()
  
  return result

@app.get("/sets/sources/{source_id}")
def get_single_source(sources_id: int, response: Response, session: Session = Depends(get_session)):
  source = session.get(Sources, sources_id)
  if source is None:
    response.status_code = 404
    return "Source not found"
  
  return source

@app.post("/sets/sources/add")
async def add_source(sets_id: int, session: Session = Depends(get_session)):
  new_source = Sources(
    name="New Source",
    set_id= sets_id
  )
  
  session.add(new_source)
  session.commit()
  session.refresh(new_source)
  return {"message": f"New source: {new_source}"}

@app.post("/sets/notes/sources/add")
async def add_source_to_note(sources_id: int, notes_id: int, session: Session = Depends(get_session)):
  new_link = LinkSourceNote(
    source_id= sources_id,
    note_id= notes_id
  )

  session.add(new_link)
  session.commit()
  session.refresh(new_link)
  return {"message": f"Source: {sources_id} added to Note: {notes_id}"}

@app.delete("/sets/sources/{sources_id}")
def delete_source(sources_id: int, response: Response, session: Session = Depends(get_session)):
  source = session.get(Sources, sources_id)
  if source is None:
    response.status_code = 404
    return "Source not found"
  
  session.delete(source)
  session.commit()
  return {"message" : f"Source with id: {sources_id} deleted"}

if __name__ == '__main__':
  uvicorn.run('main:app', host='localhost', port=8000, reload=True)