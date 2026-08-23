# from langchain_groq import ChatGroq
# from langchain_core.prompts import PromptTemplate
# from langchain_core.output_parsers import JsonOutputParser

# llm = ChatGroq(
#     model="llama-3.3-70b-versatile",
#     temperature=0
# )

# parser = JsonOutputParser()

# prompt = PromptTemplate(

#     template="""

# You are a Senior Internal Medicine Physician.

# Use ONLY:

# 1. OCR Text
# 2. Medical Context
# 3. Vision Output

# Never invent any medical values.

# Return ONLY valid JSON.

# {{
#     "disease":"",
#     "summary":"",
#     "risk":"Low|Medium|High",
#     "health_score":0,
#     "confidence":0,
#     "abnormal_values":[],
#     "possible_conditions":[],
#     "medicines":[],
#     "medicine_schedule":[],
#     "recommendations":[],
#     "follow_up_tests":[],
#     "doctor_notes":"",
#     "overall_health":"",
#     "emergency":{{
#         "priority":"",
#         "consult":"",
#         "ambulance":false
#     }}
# }}

# Medical Context

# {context}

# Vision

# {vision}

# OCR Report

# {text}

# {format}

# """,

#     input_variables=[
#         "context",
#         "vision",
#         "text"
#     ],

#     partial_variables={
#         "format": parser.get_format_instructions()
#     }

# )

# chain = prompt | llm | parser


# def clinical_decision_agent(state):
#     print(">>> clinc_agent start")
#     result = chain.invoke({

#         "context": state.get("context", ""),

#         "vision": state.get("vision_output", ""),

#         "text": state.get("text", "")

#     })

#     state["clinical"] = result
#     print(">>> clinc_agent end")
#     return state