from typing import Optional
from pydantic import BaseModel, Field
from datetime import date

class PaymentHistory(BaseModel):
    id: Optional[int] = None
    employee_id: int = Field(..., ge=1, description="ID of the employee")
    amount_paid: float = Field(..., gt=0, description="Amount paid to the employee")
    payment_date: date = Field(..., description="Date when the payment was made")

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "id": 1,
                    "employee_id": 42,
                    "amount_paid": 1500.50,
                    "payment_date": "2024-11-01"
                }
            ]
        }
