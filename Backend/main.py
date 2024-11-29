from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import Backend.services.crud as crud
from Backend.config.database import engine, localsession
from Backend.models.models import Base
from Backend.schemas.schemas import UserData, UserId
app = FastAPI() 
Base.metadata.create_all(bind=engine)


def get_db():
    db= localsession()
    try:
        yield db
    finally:
        db.close()
@app.get('/docs')
def root():
    return {'message': 'hi'} 

@app.get('/api/users/', response_model=list[UserId])
def get_users(db:Session = Depends(get_db)):
    return crud.get_users(db=db)

@app.get('/api/users/{id}',response_model=UserId)
def get_user(id: int, db: Session = Depends(get_db)):  
    user_by_id = crud.get_user_by_id(db=db, id=id)  
    if user_by_id:
        return user_by_id
    raise HTTPException(status_code=404, detail="user not found")

@app.post('/api/users/',response_model=UserId)
def create_user(user:UserData, db:Session =Depends(get_db)):
    check_name = crud.get_user_by_name(db=db, name=user.name)
    if check_name:
        raise HTTPException(status_code=400, detail="user already exists")
    return crud.create_user(db=db, user=user)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Especifica el origen del cliente (React o similar)
    allow_credentials=True,  # Permite enviar cookies o encabezados de autenticación
    allow_methods=["*"],     # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],     # Permite todos los encabezados necesarios
)