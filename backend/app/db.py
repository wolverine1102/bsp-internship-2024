import oracledb
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv


d = r"C:\oracle\instantclient_21_13"
oracledb.init_oracle_client(lib_dir=d)

load_dotenv()

# Database connection details
USERNAME = os.environ.get("DB_USERNAME")
PASSWORD = os.environ.get("DB_PASSWORD")
HOST = os.environ.get("HOST")
PORT = os.environ.get("PORT")
SERVICE_NAME = os.environ.get("SERVICE_NAME")

# Use oracledb to establish connection
dsn = f"{USERNAME}/{PASSWORD}@{HOST}:{PORT}/{SERVICE_NAME}"

try:
    connection = oracledb.connect(dsn)
    print("Connection successful!")
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM dual")
        result = cursor.fetchone()
        if result:
            print(result)
except oracledb.DatabaseError as e:
    print("Connection failed:", e)
finally:
    if connection:
        connection.close()  # Close connection if established

# Create a SQLAlchemy engine and session maker
DATABASE_URL = f"oracle+oracledb://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{SERVICE_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base = declarative_base()


