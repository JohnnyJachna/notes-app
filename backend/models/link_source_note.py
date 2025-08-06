from sqlmodel import Field, SQLModel

class LinkSourceNote(SQLModel, table=True):
  __tablename__: str = "link_source_note"

  source_id: int | None = Field(default=None, foreign_key="source.id", primary_key=True)
  note_id: int | None = Field(default=None, foreign_key="note.id", primary_key=True)