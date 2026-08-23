# from langchain_groq import ChatGroq
# from langchain_core.prompts import PromptTemplate
# from langchain_core.output_parsers import JsonOutputParser

# llm = ChatGroq(
#     model="llama-3.3-70b-versatile",
#     temperature=0
# )

# parser = JsonOutputParser()

# prompt = PromptTemplate(

# template="""

# You are a Senior Pathologist.

# Analyze the laboratory report.

# Extract every lab parameter.

# For each parameter provide

# • Name
# • Value
# • Unit
# • Normal Range
# • Status
# • Clinical Meaning

# Return ONLY JSON.

# {{
#     "lab_analysis":[
#         {{
#             "name":"",
#             "value":"",
#             "unit":"",
#             "normal_range":"",
#             "status":"",
#             "meaning":""
#         }}
#     ],

#     "critical_parameters":[

#     ],

#     "overall_summary":""
# }}

# Report

# {text}

# {format}

# """,

# input_variables=[
#     "text"
# ],

# partial_variables={
#     "format": parser.get_format_instructions()
# }

# )

# chain = prompt | llm | parser


# def lab_analyzer_agent(state):

#     result = chain.invoke({

#         "text": state["text"]

#     })

#     state["lab_analysis"] = result

#     return state