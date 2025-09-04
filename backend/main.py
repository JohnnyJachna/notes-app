import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import sets_router, notes_router, tags_router, sources_router

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
	  allow_headers=['*']
)

app.include_router(sets_router, prefix="/sets")
app.include_router(notes_router, prefix="/sets/{set_id}/notes")
app.include_router(tags_router, prefix="/sets/{set_id}/tags")
app.include_router(sources_router, prefix="/sets/{set_id}/sources")

if __name__ == '__main__':
  uvicorn.run('main:app', host='localhost', port=8000, reload=True)