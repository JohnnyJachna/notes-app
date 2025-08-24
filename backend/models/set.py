from .base import Base
from sqlmodel import Field

class Set(Base, table=True):
  __tablename__: str = "set"

  name: str
  create_date: str
  update_date: str
  user_id: str = Field(index=True)