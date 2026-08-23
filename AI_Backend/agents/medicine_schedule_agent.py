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

# You are an experienced physician.

# Generate a patient-friendly medicine timetable.

# Medicines

# {medicines}

# Return ONLY JSON.

# {{
#     "schedule":[
#         {{
#             "time":"",
#             "medicine":"",
#             "dosage":"",
#             "food":"",
#             "purpose":""
#         }}
#     ]
# }}

# {format}

# """,

#     input_variables=["medicines"],

#     partial_variables={
#         "format": parser.get_format_instructions()
#     }

# )

# chain = prompt | llm | parser


# def medicine_schedule_agent(state):

#     medicines = state["diagnosis"].get("medicines", [])

#     if len(medicines) == 0:
#         state["medicine_schedule"] = []
#         return state

#     result = chain.invoke({
#         "medicines": medicines
#     })

#     state["medicine_schedule"] = result.get("schedule", [])

#     return state