from sqlmodel import Field, Relationship
from .base import Base
from .links import LinkTagNote, LinkSourceNote

class Note(Base, table=True):
  __tablename__: str = "note"

  header: str
  content: str
  create_date: str
  update_date: str
  set_id: int | None = Field(default=None, foreign_key="set.id", ondelete="CASCADE")
  tags: list["Tag"] = Relationship(back_populates="notes", link_model=LinkTagNote)
  sources: list["Source"] = Relationship(back_populates="notes", link_model=LinkSourceNote)
  

class Tag(Base, table=True):
  __tablename__: str = "tag"

  name: str
  set_id: int | None = Field(default=None, foreign_key="set.id", ondelete="CASCADE")
  notes: list["Note"] = Relationship(back_populates="tags", link_model=LinkTagNote)


class Source(Base, table=True):
  __tablename__: str = "source"

  name: str
  title: str | None
  authors: str | None
  publishers: str | None
  pages: str | None
  publish_date: str | None
  update_date: str | None
  access_date: str | None
  set_id: int | None = Field(default=None, foreign_key="set.id", ondelete="CASCADE")
  notes: list["Note"] = Relationship(back_populates="sources", link_model=LinkSourceNote)
