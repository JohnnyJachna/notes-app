from .base import Base

class Sets(Base, table=True):
  __tablename__: str = "sets"

  name: str
  create_date: str
  update_date: str