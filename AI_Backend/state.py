from typing import TypedDict

class MedicalState(TypedDict):

    file: str

    file_type: str

    text: str

    context: str

    diagnosis: dict

    recommendation: dict

    risk: dict

    summary: str

    question: str

    answer: str

    next_agent: str