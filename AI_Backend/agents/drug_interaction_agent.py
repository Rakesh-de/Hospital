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
# You are a Clinical Pharmacologist.

# Rules:

# - Analyze ONLY the medicines provided.
# - Never invent medicines.
# - Never guess generic names.
# - If fewer than 2 medicines are provided, return:

# {{
#     "overall_safe": true,

#     "interactions": [
#         {{
#             "medicine1": "",
#             "medicine2": "",
#             "severity": "Low/Medium/High",
#             "reason": "",
#             "recommendation": ""
#         }}
#     ],

#     "food_interactions": [
#         {{
#             "medicine": "",
#             "food": "",
#             "instruction": ""
#         }}
#     ],

#     "duplicate_therapy": [],

#     "warnings": []

# }}

# Medicines

# {medicines}

# {format}
# """,

#     input_variables=[
#         "medicines"
#     ],

#     partial_variables={
#         "format": parser.get_format_instructions()
#     }

# )

# chain = prompt | llm | parser


# def drug_interaction_agent(state):

#     medicines = state.get("clinical", {}).get(
#         "medicines",
#         []
#     )

#     if not medicines:

#         state["drug_interactions"] = {
#             "overall_safe": True,
#             "interactions": [],
#             "food_interactions": [],
#             "duplicate_therapy": [],
#             "warnings": []
#         }

#         return state

#     try:

#         result = chain.invoke({

#             "medicines": medicines

#         })

#         state["drug_interactions"] = result

#     except Exception as e:

#         print("Drug Interaction Agent Error:", e)

#         state["drug_interactions"] = {

#             "overall_safe": True,

#             "interactions": [],

#             "food_interactions": [],

#             "duplicate_therapy": [],

#             "warnings": []

#         }

#     return state