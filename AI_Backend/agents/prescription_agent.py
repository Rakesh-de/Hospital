from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser

llm = ChatGroq(
     model="llama-3.3-70b-versatile",
    #  model ="llama-3.1-8b-instant",
    temperature=0
)

parser = JsonOutputParser()

prompt = PromptTemplate(
    template="""
You are an experienced Physician and Pharmacist.

The OCR and medicine extraction have already been performed.

Your task is to clean, normalize and enrich the medicine information.

Return ONLY valid JSON.

{{
    "medicines":[
        {{
            "name":"",
            "strength":"",
            "dose":"",
            "timing":"",
            "duration":"",
            "purpose":"",
            "confidence":0
        }}
    ]
}}

Extracted Medicines

{medicines}

Doctor Notes

{doctor_notes}

{format}
""",
    input_variables=["medicines", "doctor_notes"],
    partial_variables={
        "format": parser.get_format_instructions()
    }
)

chain = prompt | llm | parser


def prescription_agent(state):

    vision = state.get("vision", {})

    medicines = vision.get("medicines", [])
    doctor_notes = vision.get("doctor_notes", "")

    result = chain.invoke(
        {
            "medicines": medicines,
            "doctor_notes": doctor_notes
        }
    )

    state["prescription"] = result

    return state