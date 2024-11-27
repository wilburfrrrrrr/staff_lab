from fastapi import APIRouter, Path, Query, Depends, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from models.applicants import Applicants as ApplicantsModel
from config.database import Session
from middlewares.jwt_bearer import JWTBearer
from services.applicants import ApplicantsService
from utils.files_manager import upload_files
from schemas.applicants import Applicants

applicants_router = APIRouter()


@applicants_router.get("/applicants", tags=['applicants'], response_model=List[Applicants],
                  status_code=200, dependencies=[Depends(JWTBearer())])
def get_applicants() -> List[Applicants]:
    result = ApplicantsService(Session()).get_applicants()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@applicants_router.get("/applicants/{id}", tags=['applicants'], response_model=Applicants,
                  status_code=200, dependencies=[Depends(JWTBearer())])

def get_applicant(id: int = Path(ge=1)) -> Applicants:
    result = ApplicantsService(Session()).get_applicant(id)
    if not result:
        return JSONResponse(status_code=404, content={
            "message": "Applicant not found"
            })
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@applicants_router.get("/applicants/state/", tags=['applicants'], response_model=List[Applicants], dependencies=[Depends(JWTBearer())])
def get_applicants_by_state(state: int = Query(ge=1)) -> List[Applicants]:
    result = ApplicantsService(Session()).get_applicants_by_state(state)
    if not result:
        return JSONResponse(status_code=404, content={"message": "Applicants not found"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@applicants_router.post("/applicants", tags=['applicants'], response_model=dict, status_code=201)
async def create_applicant(
    name: str = Form(...),
    second_name: str = Form(...),
    last_name: str = Form(...),
    second_last_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    genre: str = Form(...),
    cv: UploadFile = File(...),
):
    cv_url = await upload_files(cv)

    applicant_data = Applicants(
        email=email,
        name=name,
        second_name=second_name,
        last_name=last_name,
        second_last_name=second_last_name,
        phone=phone,
        genre=genre,
        cv=cv_url,
    )

    ApplicantsService(Session()).create_applicant(applicant_data)

    return JSONResponse(content={"message": "Applicant created successfully"}, status_code=201)


@applicants_router.put("/applicants/{id}", tags=['applicants'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def update_applicant(id: int, applicant: Applicants) -> dict:
    if not ApplicantsService(Session()).get_applicant(id):
        return JSONResponse(content={"message": "Applicant not found"}, status_code=404)
    ApplicantsService(Session()).update_applicant(id, applicant)
    return JSONResponse(content={"message": "Applicant updated successfully"}, status_code=200)


@applicants_router.delete("/applicants/{id}", tags=['applicants'], response_model=dict, dependencies=[Depends(JWTBearer())])
def delete_applicant(id: int) -> dict:
    if not ApplicantsService(Session()).get_applicant(id):
        return JSONResponse(content={"message": "Applicant not found"}, status_code=404)
    ApplicantsService(Session()).delete_applicant(id)
    return JSONResponse(content={"message": "Applicant deleted successfully"})

@applicants_router.put("/applicants/preselect/{id}", tags=['applicants'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def preselect_applicant(id: int) -> dict:
    applicant_to_preselect = ApplicantsService(Session()).get_applicant(id)
    if not applicant_to_preselect:
        return JSONResponse(content={"message": "Applicant not found"}, status_code=404)
    applicant_to_preselect.state = 2
    ApplicantsService(Session()).update_applicant(id, applicant_to_preselect)
    return JSONResponse(content={"message": "Applicant updated successfully"}, status_code=200)