from typing import Optional
from pydantic import BaseModel, Field
from datetime import date

class Analyst(BaseModel):
    id: Optional[int] = None
    user_id: int
    name: str = Field(default="Unknown", min_length=1, max_length=30)
    second_name: str = Field(default="Unknown", min_length=1, max_length=30)
    last_name: str = Field(default="Unknown", min_length=1, max_length=30)
    second_last_name: str = Field(default="Unknown", min_length=1, max_length=30)
    phone: str = Field(default="Unknown", min_length=10, max_length=15)

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "id": 1,
                    "user_id": 1,
                    "name": "John",
                    "second_name": "Doe",
                    "last_name": "Smith",
                    "second_last_name": "Johnson",
                    "phone": "1234567890"
                }
            ]
        }
