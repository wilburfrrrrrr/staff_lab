from typing import Optional
from pydantic import BaseModel, Field
from datetime import date
from schemas.user import User
from schemas.analysts import Analyst

class CreateAnalystRequest(BaseModel):
    user: User
    analyst: Analyst