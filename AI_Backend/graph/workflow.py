from typing import TypedDict

from langgraph.graph import StateGraph

from agents.ocr_agent import ocr_agent
from agents.rag_agent import rag_agent
from agents.diagnosis_agent import diagnosis_agent
from agents.recommendation_agent import recommendation_agent
from agents.risk_agent import risk_agent
from agents.summary_agent import summary_agent


class MedicalState(TypedDict):

    file: str

    text: str

    context: str

    diagnosis: dict

    recommendation: dict

    risk: dict

    summary: str


builder = StateGraph(MedicalState)

builder.add_node("ocr", ocr_agent)

builder.add_node("rag", rag_agent)

builder.add_node("diagnosis", diagnosis_agent)

builder.add_node("recommendation", recommendation_agent)

builder.add_node("risk", risk_agent)

builder.add_node("summary", summary_agent)


builder.set_entry_point("ocr")

builder.add_edge("ocr", "rag")

builder.add_edge("rag", "diagnosis")

builder.add_edge("diagnosis", "recommendation")

builder.add_edge("recommendation", "risk")

builder.add_edge("risk", "summary")

builder.set_finish_point("summary")

graph = builder.compile()