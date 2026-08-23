from typing import TypedDict, Optional
from langgraph.graph import StateGraph

from agents.vision_agent import vision_agent
from agents.ocr_agent import ocr_agent
from agents.prescription_agent import prescription_agent
from agents.summary_agent import summary_agent


class MedicalState(TypedDict):
    # Input
    file: Optional[str]
    image_path: Optional[str]

    # Vision Output
    vision: dict

    # OCR Output
    text: str

    # Prescription Output
    prescription: dict

    # Final Summary
    summary: str


builder = StateGraph(MedicalState)

# -----------------------------
# Nodes
# -----------------------------

builder.add_node("vision", vision_agent)
builder.add_node("ocr", ocr_agent)
builder.add_node("prescription", prescription_agent)
builder.add_node("summary", summary_agent)

# -----------------------------
# Flow
# -----------------------------

builder.set_entry_point("vision")

builder.add_edge("vision", "ocr")
builder.add_edge("ocr", "prescription")
builder.add_edge("prescription", "summary")

builder.set_finish_point("summary")

graph = builder.compile()