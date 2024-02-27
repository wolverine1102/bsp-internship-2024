from fastapi import FastAPI
import app.db

app = FastAPI()

@app.get('/')
def index():
    return ({
        'message' : 'Hello World'
    })