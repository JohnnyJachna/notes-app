from sqlmodel import Field, Relationship, SQLModel
from .base import Base
from .links import LinkTagNote, LinkSourceNote
from typing import List

class Note(Base, table=True):
  __tablename__: str = "note"

  header: str
  content: str
  create_date: str
  update_date: str
  set_id: int | None = Field(default=None, foreign_key="set.id", ondelete="CASCADE")
  tags: List["Tag"] = Relationship(back_populates="notes", sa_relationship_kwargs={"lazy": "selectin"}, link_model=LinkTagNote)
  sources: List["Source"] = Relationship(back_populates="notes", sa_relationship_kwargs={"lazy": "selectin"}, link_model=LinkSourceNote)
  position: int | None = Field(default=None, index=True)
  color: str

class Tag(Base, table=True):
  __tablename__: str = "tag"

  name: str
  color: str
  set_id: int | None = Field(default=None, foreign_key="set.id", ondelete="CASCADE")
  notes: List["Note"] = Relationship(back_populates="tags", link_model=LinkTagNote, )


class Source(Base, table=True):
  __tablename__: str = "source"

  name: str
  color: str
  title: str | None
  authors: str | None
  publishers: str | None
  pages: str | None
  publish_date: str | None
  update_date: str | None
  access_date: str | None
  set_id: int | None = Field(default=None, foreign_key="set.id", ondelete="CASCADE")
  notes: List["Note"] = Relationship(back_populates="sources", link_model=LinkSourceNote)

class TagRead(SQLModel):
    id: int
    name: str
    color: str
    set_id: int

class SourceRead(SQLModel):
    id: int
    name: str
    color: str
    title: str | None
    authors: str | None
    publishers: str | None
    pages: str | None
    publish_date: str | None
    update_date: str | None
    access_date: str | None
    set_id: int

class NoteRead(SQLModel):
    id: int
    header: str
    content: str
    create_date: str
    update_date: str
    set_id: int
    tags: List[TagRead] | None= []
    sources: List[SourceRead] | None = []
    position: int | None
    color: str
    
class NotePositionUpdate(SQLModel):
    id: int
    position: int | None = Field(default=None)
