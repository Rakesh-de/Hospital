# from langchain_groq import ChatGroq
# from langchain_core.prompts import PromptTemplate

# llm = ChatGroq(
#     #  model="llama-3.3-70b-versatile"
#    model="qwen/qwen3.6-27b",
# )

# prompt = PromptTemplate(
#     template="""
# You are a medical AI assistant.

# Based on the following extracted prescription information, write a short medical summary.

# Doctor Notes:
# {doctor_notes}

# Medicines:
# {medicines}

# Write the summary in 4-6 lines.
# """,
#     input_variables=["doctor_notes", "medicines"]
# )

# chain = prompt | llm


# def summary_agent(state):

#     vision = state.get("vision", {})
#     prescription = state.get("prescription", {})

#     doctor_notes = vision.get("doctor_notes", "")

#     medicines = prescription.get(
#         "medicines",
#         vision.get("medicines", [])
#     )

#     summary = chain.invoke(
#         {
#             "doctor_notes": doctor_notes,
#             "medicines": medicines,
#         }
#     )

#     state["summary"] = summary.content

#     return state



from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

llm = ChatGroq(
    model="qwen/qwen3.6-27b",
    temperature=0,
    model_kwargs={
        "extra_body": {
            "reasoning_format": "hidden"  # Qwen ke thinking process ko hide karne ke liye
        }
    }
)

prompt = PromptTemplate(
    template="""
You are a medical AI assistant.

Based on the following extracted prescription information, write a short medical summary.

Doctor Notes:
{doctor_notes}

Medicines:
{medicines}

Write ONLY the final summary in 4-6 lines. Do not output any thinking process.
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

    # Clean output string if any tags remain
    content = summary.content
    if "</think>" in content:
        content = content.split("</think>")[-1].strip()

    state["summary"] = content
    return state