import oracledb
import os
from dotenv import load_dotenv


oracledb.init_oracle_client()

load_dotenv()

# Database connection details
USERNAME = os.environ.get("DB_USERNAME")
PASSWORD = os.environ.get("DB_PASSWORD")
HOST = os.environ.get("HOST")
PORT = os.environ.get("PORT")
SERVICE_NAME = os.environ.get("SERVICE_NAME")

# Use oracledb to establish connection
dsn = f"{USERNAME}/{PASSWORD}@{HOST}:{PORT}/{SERVICE_NAME}"

def create_connection():
    connection = None
    try:
        connection = oracledb.connect(dsn)

    except oracledb.DatabaseError as e:
        print("Connection failed:", e)

    return connection



