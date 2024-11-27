import os 
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()
DB_NAME= os.getenv('DB_NAME')
DB_DIALECT= os.getenv('DB_DIALECT')

URL_CONNECTION = '{}:///{}.{}'.format(DB_DIALECT,DB_NAME, DB_DIALECT)

engine = create_engine(URL_CONNECTION, connect_args={"check_same_thread": False})
Session = sessionmaker(autoflush=False, autocommit=False, bind=engine)

Base=declarative_base()

