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

# You are a senior physician.

# Disease detected from previous medical analysis:

# {disease}

# Rules:

# - Use ONLY this disease.
# - Never change disease.
# - Never infer another disease.
# - If disease is Unknown return empty recommendations.
# - Never recommend medicines for diseases not mentioned.

# Return JSON only.


# {format}

# """,

# input_variables=["disease"],

# partial_variables={

# "format":parser.get_format_instructions()

# }

# )

# chain = prompt | llm | parser


# def recommendation_agent(state):

#     disease = state["diagnosis"].get("disease","").strip()

#     if disease == "":
#         state["recommendation"] = {
#             "Disease": "Unknown",
#             "Medicines": [],
#             "Diet": [],
#             "Exercise": [],
#             "Lifestyle": [],
#             "Next medical tests": []
#         }
#         return state

#     result = chain.invoke({
#         "disease": disease
#     })

#     state["recommendation"] = result

#     return state