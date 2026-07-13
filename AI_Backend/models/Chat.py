from pydantic import BaseModel
from datetime import datetime


class Chat(BaseModel):

    user_id: str

    question: str

    answer: str

    created_at: datetime = datetime.utcnow()