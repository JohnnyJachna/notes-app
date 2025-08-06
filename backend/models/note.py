from sqlmodel import Field
from .base import Base

class Notes(Base, table=True):
  __tablename__: str = "notes"

  name: str
  header: str
  content: str
  create_date: str
  update_date: str
  set_id: int | None = Field(default=None, foreign_key="set.id")