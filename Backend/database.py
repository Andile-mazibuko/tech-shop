from sqlalchemy import create_engine
from sqlalchemy.orm import Session, declarative_base,sessionmaker

DB_URL ="postgresql://root:root@localhost:5432/postgres"

engine = create_engine(DB_URL,echo=True)
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)