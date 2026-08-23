# import os

# from dotenv import load_dotenv

# from langchain_groq import ChatGroq
# from langchain_core.prompts import PromptTemplate
# from langchain_core.output_parsers import JsonOutputParser

# from services.medicine_normalizer import normalize_medicines

# load_dotenv()

# llm = ChatGroq(
#     model="llama-3.3-70b-versatile",
#     temperature=0
# )

# parser = JsonOutputParser()

# prompt = PromptTemplate(

# template="""

# You are a Senior Internal Medicine Specialist.

# You are analyzing one of the following:

# 1. Laboratory Report
# 2. Doctor Prescription
# 3. Medical Report

# Rules:

# Rules:

# - Analyze according to report_type.
# - Use Vision Extraction as the PRIMARY source.
# - Use OCR text only when Vision Extraction is missing.
# - Never infer medicine names from partial text.
# - Never convert brand names to generic names unless explicitly written.
# - Never invent laboratory values.
# - Never invent diseases.
# - Never invent dosages.
# - If any field is not visible, return an empty string "".
# - Return exactly what is written in the report.
# - Return ONLY valid JSON.

# Medical Context

# {context}

# Vision Extraction (Highest Priority)

# {vision}

# OCR Text (Fallback Only)

# {text}
# Return JSON exactly like this.

# {{
#     "report_type":"",
#     "disease":"",
#     "summary":"",
#     "overall_health":"",
#     "risk":"Low",
#     "confidence":0,
#     "health_score":0,
#     "doctor_notes":"",

#     "abnormal_values":[
#         {{
#             "name":"",
#             "value":"",
#             "normal_range":"",
#             "status":"Low"
#         }}
#     ],

#     "possible_conditions":[
#     ],

#     "medicines":[
#         {{
#             "name":"",
#             "purpose":"",
#             "dosage":"",
#             "timing":"",
#             "food_instruction":"",
#             "duration":"",
#             "side_effects":[
#             ],
           
#         }}
#     ],

#     "recommendations":[
#     ],

#     "follow_up_tests":[
#     ],

#     "emergency":false
# }}

# {format}

# """,

# input_variables=[
#     "context",
#     "vision",
#     "text"
# ],

# partial_variables={
#     "format": parser.get_format_instructions()
# }

# )

# chain = prompt | llm | parser


# def diagnosis_agent(state):
#     print(">>> daignocis_agent start")
#     vision = state.get("vision", {})

#     result = chain.invoke(
#      {
#         "context": state.get("context", ""),
#         "vision": vision,
#         "text": vision.get("ocr_text", state.get("text", ""))
#     }
#     )
#     medicines = result.get("medicines", [])

#     normalized = normalize_medicines(medicines)

#     result["medicines"] = normalized

#     state["diagnosis"] = result
#     print(">>> daignocis_agent end")
#     return state