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

# Compare the patient's previous medical report with the current report.

# Analyze:

# - Overall progress
# - Improved parameters
# - Worsened parameters
# - Stable parameters
# - Doctor's comment
# - Recommended next action

# Return ONLY valid JSON.

# {{
#     "overall_progress": "",

#     "improved_parameters": [],

#     "worsened_parameters": [],

#     "stable_parameters": [],

#     "doctor_comment": "",

#     "next_action": ""
# }}

# Previous Report

# {old_report}

# Current Report

# {new_report}

# {format}
# """,

#     input_variables=[
#         "old_report",
#         "new_report"
#     ],

#     partial_variables={
#         "format": parser.get_format_instructions()
#     }

# )

# chain = prompt | llm | parser


# def report_comparison_agent(state):

#     previous = state.get("previous_report")

#     current = state.get("clinical", {})

#     if not previous:

#         state["comparison"] = {
#             "overall_progress": "No previous report available.",
#             "improved_parameters": [],
#             "worsened_parameters": [],
#             "stable_parameters": [],
#             "doctor_comment": "",
#             "next_action": ""
#         }

#         return state

#     try:

#         result = chain.invoke({

#             "old_report": previous,

#             "new_report": current

#         })

#         state["comparison"] = result

#     except Exception as e:

#         print("Report Comparison Agent Error:", e)

#         state["comparison"] = {

#             "overall_progress": "Comparison unavailable.",

#             "improved_parameters": [],

#             "worsened_parameters": [],

#             "stable_parameters": [],

#             "doctor_comment": "",

#             "next_action": ""

#         }

#     return state