from typing import Optional
from pydantic import BaseModel, Field

class Applicants(BaseModel):
    id: Optional[int] = None
    name: str = Field(default="Unknown", min_length=1, max_length=30)
    second_name: str = Field(default="Unknown", min_length=1, max_length=30)
    last_name: str = Field(default="Unknown", min_length=1, max_length=30)
    second_last_name: str = Field(default="Unknown", min_length=1, max_length=30)
    email: str = Field(default="email", min_length=5, max_length=50)
    phone: str = Field(default="Unknown", min_length=10, max_length=15)
    genre: str = Field(default="Unknown", min_length=1, max_length=10)
    state: int = Field(1, ge=1)
    cv: str = Field(default="Unknown", min_length=1, max_length=255)

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "id": 1,
                    "name": "Pepo",
                    "second_name": "Pepito",
                    "last_name": "Perez",
                    "second_last_name": "Perlaza",
                    "email": "example@example.com",
                    "phone": "1234567890",
                    "genre": "Male",
                    "state": "Pending",
                    "cv": "link_to_cv.pdf"
                }
            ]
        }
