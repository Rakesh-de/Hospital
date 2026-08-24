# from langchain_groq import ChatGroq
# from langchain_core.prompts import PromptTemplate
# from langchain_core.output_parsers import JsonOutputParser

# llm = ChatGroq(
#     #  model="llama-3.3-70b-versatile",
#      model="qwen/qwen3.6-27b",
#     temperature=0
# )

# parser = JsonOutputParser()

# prompt = PromptTemplate(
#     template="""
# You are an experienced Physician and Pharmacist.

# The OCR and medicine extraction have already been performed.

# Your task is to clean, normalize and enrich the medicine information.

# Return ONLY valid JSON.

# {{
#     "medicines":[
#         {{
#             "name":"",
#             "strength":"",
#             "dose":"",
#             "timing":"",
#             "duration":"",
#             "purpose":"",
#             "confidence":0
#         }}
#     ]
# }}

# Extracted Medicines

# {medicines}

# Doctor Notes

# {doctor_notes}

# {format}
# """,
#     input_variables=["medicines", "doctor_notes"],
#     partial_variables={
#         "format": parser.get_format_instructions()
#     }
# )

# chain = prompt | llm | parser


# def prescription_agent(state):

#     vision = state.get("vision", {})

#     medicines = vision.get("medicines", [])
#     doctor_notes = vision.get("doctor_notes", "")

#     result = chain.invoke(
#         {
#             "medicines": medicines,
#             "doctor_notes": doctor_notes
#         }
#     )

#     state["prescription"] = result

#     return state



import os
import json
import re
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="qwen/qwen3.6-27b",
    temperature=0,
    model_kwargs={"extra_body": {"reasoning_format": "hidden"}}
)

def prescription_agent(state):
    print("========== PRESCRIPTION AGENT ==========")
    vision = state.get("vision", {})
    ocr_text = state.get("text", "")
    
    prompt = f"""You are a clinical pharmacist. Extract and clean medicine details into a STRICT JSON format.

Input Text:
{ocr_text}

Raw Medicines Data:
{json.dumps(vision.get('medicines', []))}

Return ONLY a valid JSON object with key "medicines". No markdown, no reasoning.
JSON Structure:
{{
    "medicines": [
        {{
            "name": "Medicine Name",
            "dose": "Dose quantity (e.g. 10ml, 1 sachet)",
            "strength": "Concentration (e.g. 5%, 500mg or --)",
            "timing": "When to take (e.g. stat, twice daily)",
            "duration": "Duration or --",
            "purpose": "Reason for taking or --"
        }}
    ]
}}"""

    try:
        response = llm.invoke(prompt)
        content = response.content.strip()
        
        if "</think>" in content:
            content = content.split("</think>")[-1].strip()
            
        content = re.sub(r"```json\s*", "", content)
        content = re.sub(r"```\s*", "", content).strip()
        
        parsed = json.loads(content)
        state["prescription"] = parsed
    except Exception as e:
        print("Prescription Agent Error, using vision fallback:", e)
        # Fallback formatting matching UI fields
        formatted_meds = []
        for m in vision.get("medicines", []):
            formatted_meds.append({
                "name": m.get("name", "--"),
                "dose": m.get("dosage", "--"),
                "strength": "--",
                "timing": m.get("timing", "--"),
                "duration": m.get("duration", "--"),
                "purpose": "--"
            })
        state["prescription"] = {"medicines": formatted_meds}
        
    print("========== END PRESCRIPTION ==========")
    return state