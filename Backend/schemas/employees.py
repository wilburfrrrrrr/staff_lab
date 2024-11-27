from typing import Optional
from pydantic import BaseModel, Field
from datetime import date

class Employee(BaseModel):
    id: Optional[int] = None
    applicant_id: int
    sueldo_base: int = Field(default=0, ge=0)
    date_hired: date = Field(default_factory=date.today)
    extra_hours: int = Field(default=0, ge=0)
    bonificacion: int = Field(default=0, ge=0)
    auxilio_rodamiento: int = Field(default=0, ge=0)
    last_payment: date = Field(default_factory=date.today)

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "id": 1,
                    "applicant_id": 1,
                    "sueldo_base": 1500,
                    "date_hired": "2024-11-01",
                    "extra_hours": 10,
                    "bonificacion": 200,
                    "auxilio_rodamiento": 100,
                    "last_payment": "2024-11-15"
                }
            ]
        }
