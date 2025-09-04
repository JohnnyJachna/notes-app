from .sets import router as sets_router
from .notes import router as notes_router
from .tags import router as tags_router
from .sources import router as sources_router

__all__ = ["sets_router", "notes_router", "tags_router", "sources_router"]