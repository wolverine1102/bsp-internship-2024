from fastapi import FastAPI
from app.api import schedule


app = FastAPI()

app.include_router(schedule.router)