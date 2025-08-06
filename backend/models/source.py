from sqlmodel import Field
from .base import Base

class Sources(Base, table=True):
  __tablename__: str = "sources"

  name: str
  title: str | None
  authors: str | None
  publishers: str | None
  pages: str | None
  publish_date: str | None
  update_date: str | None
  access_date: str | None
  set_id: int | None = Field(default=None, foreign_key="set.id")