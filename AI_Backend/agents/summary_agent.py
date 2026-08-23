from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

llm = ChatGroq(
     model="llama-3.3-70b-versatile"
    #model ="llama-3.1-8b-instant"
)

prompt = PromptTemplate(
    template="""
You are a medical AI assistant.

Based on the following extracted prescription information, write a short medical summary.

Doctor Notes:
{doctor_notes}

Medicines:
{medicines}

Write the summary in 4-6 lines.
""",
    input_variables=["doctor_notes", "medicines"]
)

chain = prompt | llm


def summary_agent(state):

    vision = state.get("vision", {})
    prescription = state.get("prescription", {})

    doctor_notes = vision.get("doctor_notes", "")

    medicines = prescription.get(
        "medicines",
        vision.get("medicines", [])
    )

    summary = chain.invoke(
        {
            "doctor_notes": doctor_notes,
            "medicines": medicines,
        }
    )

    state["summary"] = summary.content

    return state