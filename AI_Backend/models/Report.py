from pydantic import BaseModel
from typing import Optional


class Report(BaseModel):

    filename: str

    filepath: str

    extracted_text: str

    summary: Optional[str] = ""

    uploaded_at: Optional[str] = ""