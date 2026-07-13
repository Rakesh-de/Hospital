from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from config import settings

llm = ChatGroq(
    model=settings.GROQ_MODEL,
    api_key=settings.GROQ_API_KEY,
    temperature=0
)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are the Supervisor Agent of MediMind AI.

Your job is to decide which agent should execute next.

Available Agents:

OCR
VISION
RAG
DIAGNOSIS
RISK
RECOMMENDATION
SUMMARY
DOCTOR_CHAT
END

Rules

If report text is empty -> OCR

If uploaded file is image -> VISION

If medical context not available -> RAG

If diagnosis missing -> DIAGNOSIS

If risk missing -> RISK

If recommendation missing -> RECOMMENDATION

If summary missing -> SUMMARY

If patient asked question -> DOCTOR_CHAT

Otherwise END

Return ONLY one word.
"""
        ),
        (
            "human",
            """
Current State

File Type:
{file_type}

OCR Text:
{text}

Medical Context:
{context}

Diagnosis:
{diagnosis}

Risk:
{risk}

Recommendation:
{recommendation}

Summary:
{summary}

Patient Question:
{question}
"""
        ),
    ]
)

chain = prompt | llm


def supervisor_agent(state):

    response = chain.invoke(
        {
            "file_type": state.get("file_type", ""),
            "text": state.get("text", ""),
            "context": state.get("context", ""),
            "diagnosis": state.get("diagnosis", ""),
            "risk": state.get("risk", ""),
            "recommendation": state.get("recommendation", ""),
            "summary": state.get("summary", ""),
            "question": state.get("question", "")
        }
    )

    state["next_agent"] = response.content.strip().upper()

    return state