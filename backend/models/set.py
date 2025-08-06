from .base import Base

class Sets(Base, table=True):
  __tablename__: str = "set"

  name: str
  create_date: str
  update_date: str