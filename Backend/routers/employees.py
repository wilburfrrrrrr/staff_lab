from fastapi import APIRouter, Path, Query, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from models.employees import Employee as EmployeeModel
from models.payment_history import PaymentHistory as PaymentHistoryModel
from config.database import Session
from middlewares.jwt_bearer import JWTBearer
from services.employees import EmployeeService
from services.applicants import ApplicantsService
from schemas.employees import Employee
from schemas.payment_history import PaymentHistory
from utils.files_manager import upload_files

employee_router = APIRouter()


@employee_router.get("/employee", tags=['employee'], response_model=List[Employee],
                  status_code=200, dependencies=[Depends(JWTBearer())])
def get_employees() -> List[Employee]:
    result = EmployeeService(Session()).get_employees()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@employee_router.get("/employee/{id}", tags=['employee'], response_model=Employee,
                  status_code=200, dependencies=[Depends(JWTBearer())])

def get_employee(id: int = Path(ge=1)) -> Employee:
    result = EmployeeService(Session()).get_employee(id)
    if not result:
        return JSONResponse(status_code=404, content={
            "message": "Employee not found"
            })
    return JSONResponse(status_code=200, content=jsonable_encoder(result))
    

@employee_router.post("/employee/{id}", tags=['employee'], response_model=dict, status_code=201, dependencies=[Depends(JWTBearer())])
def create_employee(id: int, employee: Employee) -> dict:
    result = ApplicantsService(Session()).get_applicant(id)
    if not result:
        return JSONResponse(status_code=404, content={
            "message": "Applicant not found"
            })
    employee.applicant_id = result.id
    EmployeeService(Session()).create_employee(employee)
    result.state = 3
    ApplicantsService(Session()).update_applicant(result.id, result)
    return JSONResponse(content={"message": "Employee created successfully"}, status_code=201)


@employee_router.put("/employee/{id}", tags=['employee'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def update_employee(id: int, employee: Employee) -> dict:
    if not EmployeeService(Session()).get_employee(id):
        return JSONResponse(content={"message": "Employee not found"}, status_code=404)
    EmployeeService(Session()).update_employee(id, employee)
    return JSONResponse(content={"message": "Employee updated successfully"}, status_code=200)

@employee_router.delete("/employee/{id}", tags=['employee'], response_model=dict, dependencies=[Depends(JWTBearer())])
def delete_employee(id: int) -> dict:
    
    if not EmployeeService(Session()).get_employee(id):
        return JSONResponse(content={"message": "Employee not found"}, status_code=404)
    EmployeeService(Session()).delete_employee(id)
    return JSONResponse(content={"message": "Employee deleted successfully"})

@employee_router.put("/employee/payment/", tags=['employee'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def employee_payment() -> dict:
    employee_service = EmployeeService(Session())
    result = employee_service.process_payroll()
    return JSONResponse(status_code=200, content=result)

@employee_router.get("/payment/", tags=['employee'], response_model=List[PaymentHistory], status_code=200, dependencies=[Depends(JWTBearer())])
def payment_historial() -> List[PaymentHistory]:
    result = Session().query(PaymentHistoryModel).all()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))
