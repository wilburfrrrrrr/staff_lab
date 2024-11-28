from fastapi import APIRouter, Path, Query, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from models.analysts import Analyst as AnalystModel
from config.database import Session
from middlewares.jwt_bearer import JWTBearer
from services.analysts import AnalystService
from schemas.analysts import Analyst
from schemas.request_helpers import CreateAnalystRequest
from services.user import UserService
from schemas.user import User

analysts_router = APIRouter()


@analysts_router.get("/analyst", tags=['analyst'], response_model=List[Analyst],
                  status_code=200, dependencies=[Depends(JWTBearer())])
def get_analysts() -> List[Analyst]:
    result = AnalystService(Session()).get_analysts()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@analysts_router.get("/analyst/{id}", tags=['analyst'], response_model=Analyst,
                  status_code=200, dependencies=[Depends(JWTBearer())])
def get_analyst(id: int = Path(ge=1)) -> Analyst:
    result = AnalystService(Session()).get_analyst(id)
    if not result:
        return JSONResponse(status_code=404, content={
            "message": "User not found"
            })
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@analysts_router.post("/analyst", tags=['analyst'], response_model=dict, status_code=201, dependencies=[Depends(JWTBearer())])
def create_analyst(request: CreateAnalystRequest) -> dict:
    user_service = UserService(Session())
    user_service.create_user(request.user)

    analyst_service = AnalystService(Session())
    analyst_data = request.analyst 
    user_id = user_service.get_user_by_mail(request.user.email).id

    # Crear un nuevo objeto Analyst con el campo adicional
    analyst_data = request.analyst.model_copy(update={"user_id": user_id})
    analyst_service.create_analyst(analyst_data)

    return JSONResponse(content={"message": "Analyst created successfully"}, status_code=201)


@analysts_router.put("/analyst/{id}", tags=['analyst'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def update_analyst(id: int, analyst: Analyst) -> dict:
    if not AnalystService(Session()).get_analyst(id):
        return JSONResponse(content={"message": "Analyst not found"}, status_code=404)
    AnalystService(Session()).update_analyst(id, analyst)
    return JSONResponse(content={"message": "Analyst updated successfully"}, status_code=200)


@analysts_router.delete("/analyst/{id}", tags=['analyst'], response_model=dict, dependencies=[Depends(JWTBearer())])
def delete_analyst(id: int) -> dict:
    if not AnalystService(Session()).get_analyst(id):
        return JSONResponse(content={"message": "Analyst not found"}, status_code=404)
    AnalystService(Session()).delete_analyst(id)
    return JSONResponse(content={"message": "Analyst deleted successfully"})