from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from config.database import engine, Base
from middlewares.error_handler import ErrorHandler
from fastapi.middleware.cors import CORSMiddleware
from routers.analysts import analysts_router
from routers.auth import auth_router
from routers.applicants import applicants_router
from routers.employees import employee_router
from routers.user import user_router

app = FastAPI() 
app.title = "Staff Lab" 
app.version = "1.0"

app.add_middleware(ErrorHandler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Especifica el origen del cliente (React o similar)
    allow_credentials=True,  # Permite enviar cookies o encabezados de autenticación
    allow_methods=["*"],     # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],     # Permite todos los encabezados necesarios
)

app.include_router(analysts_router)
app.include_router(employee_router)
app.include_router(applicants_router)
app.include_router(user_router)
app.include_router(auth_router)

Base.metadata.create_all(bind=engine)

@app.get("/", tags=['home']) # Aqui se agrega la ruta de inicio
def message():
    return HTMLResponse(content="<h1> STAFF LAB PROJECT </h1>")