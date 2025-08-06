import uvicorn

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
  return {"message": "Home Page"}

if __name__ == '__main__':
  uvicorn.run('main:app', host='localhost', port=8000, reload=True)