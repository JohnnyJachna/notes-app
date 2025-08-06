from sqlmodel import Field, SQLModel

class LinkTagNote(SQLModel, table=True):
  __tablename__: str = "link_tag_note"

  tag_id: int | None = Field(default=None, foreign_key="tag.id", primary_key=True)
  note_id: int | None = Field(default=None, foreign_key="note.id", primary_key=True)