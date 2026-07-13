from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class User(BaseModel):

    name: str

    email: EmailStr

    password: str

    is_verified: bool = False

    role: str = "patient"

    created_at: datetime = datetime.utcnow()

    profile_image: Optional[str] = None