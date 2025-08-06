from sqlmodel import Field, SQLModel

class LinkTagNote(SQLModel, table=True):
  __tablename__: str = "link_tag_note"

  tag_id: int | None = Field(default=None, foreign_key="tags.id", primary_key=True)
  note_id: int | None = Field(default=None, foreign_key="notes.id", primary_key=True)