from sqlmodel import Field
from .base import Base

class Tags(Base, table=True):
  __tablename__: str = "tags"

  name: str
  set_id: int | None = Field(default=None, foreign_key="sets.id")