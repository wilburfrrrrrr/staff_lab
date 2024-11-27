from typing import Optional
from pydantic import BaseModel, Field

class User(BaseModel):
    id: Optional[int] = None
    email: str = Field(default="email", min_length=5, max_length=30)
    password: str = Field(default="password", min_length=8, max_length=30)
    rol: int = Field(1, ge=1)

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "id": 1,
                    "email": "user@example.com",
                    "password": "securepassword123",
                    "rol": 1
                }
            ]
        }
