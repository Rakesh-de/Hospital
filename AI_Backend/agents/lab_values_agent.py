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
# You are an expert Clinical Pathologist.

# Your job is ONLY to extract laboratory values that are explicitly visible
# in the uploaded report.

# STRICT RULES

# - NEVER invent any laboratory value.
# - NEVER estimate values.
# - NEVER assume a normal range if it is not visible.
# - NEVER create example values.
# - If a parameter is unreadable, ignore it.
# - If the report is NOT a laboratory report, return:

# {{
#     "tests":[]
# }}

# - If no laboratory values are visible, return:

# {{
#     "tests":[]
# }}

# Return ONLY valid JSON.

# {{
#     "tests":[
#         {{
#             "name":"",
#             "value":"",
#             "unit":"",
#             "normal_range":"",
#             "status":"Low/Normal/High"
#         }}
#     ]
# }}

# Laboratory Report

# {text}

# {format}
# """,

#     input_variables=[
#         "text"
#     ],

#     partial_variables={
#         "format": parser.get_format_instructions()
#     }

# )

# chain = prompt | llm | parser


# def lab_values_agent(state):

#     try:

#         result = chain.invoke({

#             "text": state.get("text", "")

#         })

#         state["lab_values"] = result

#     except Exception as e:

#         print("Lab Values Agent Error:", e)

#         state["lab_values"] = {

#             "tests": []

#         }

#     return state