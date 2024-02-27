import oracledb
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


d = r"C:\oracle\instantclient_21_13"
oracledb.init_oracle_client(lib_dir=d)

# Database connection details
USERNAME = 'mesapuser'
PASSWORD = 'dev123'
HOST = '10.145.2.234'
PORT = 1521
SERVICE_NAME = 'MESDEV1A.sailbsp.com'

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


