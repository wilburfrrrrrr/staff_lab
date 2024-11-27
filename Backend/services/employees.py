from sqlalchemy.orm import joinedload
from models.employees import Employee as EmployeeModel
from schemas.employees import Employee
from models.payment_history import PaymentHistory
from models.applicants import Applicants as ApplicantModel
from datetime import date
from utils.calculate_salary import calculate_salary

class EmployeeService():
    def __init__(self, db) -> None:
        self.db = db

    def get_employees(self):
        result = self.db.query(EmployeeModel).options(joinedload(EmployeeModel.applicant)).all()
        return result

    def get_employee(self, id: int):
        result = self.db.query(EmployeeModel).options(joinedload(EmployeeModel.applicant)).filter(EmployeeModel.id == id).first()
        return result

    def create_employee(self, employee: Employee):
        new_employee = EmployeeModel(**employee.model_dump())
        self.db.add(new_employee)
        self.db.commit()

        return new_employee

    def update_employee(self, id: int, data: Employee):
        employee = self.get_employee(id)
        if employee:
            employee.sueldo_base = data.sueldo_base
            employee.date_hired = data.date_hired
            employee.extra_hours = data.extra_hours
            employee.bonificacion = data.bonificacion
            employee.auxilio_rodamiento = data.auxilio_rodamiento
            employee.last_payment = data.last_payment
            self.db.commit()
            return employee
        return None

    def delete_employee(self, id: int):
        employee = self.get_employee(id)
        if employee:
            self.db.delete(employee)
            self.db.commit()
            return True
        return False
        
    def process_payroll(self):
        employees = self.get_employees()
        for employee in employees:
            salary = calculate_salary(employee)
            payment_date = date.today()

            payment_history = PaymentHistory(
                employee_id=employee.id,
                amount_paid=salary,
                payment_date=payment_date
            )
            
            self.db.add(payment_history)

            employee.last_payment = payment_date
            self.db.commit()
        return {"message": "Payroll processed successfully"}
