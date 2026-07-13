import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq

from langchain_core.prompts import PromptTemplate

from langchain_core.output_parsers import JsonOutputParser

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0
)

parser = JsonOutputParser()

prompt = PromptTemplate(
    template="""
You are a senior doctor.

Use ONLY evidence.

Medical Context
{context}

Patient Report
{text}

Return JSON only.

{{
"disease":"",
"summary":"",
"risk":"Low/Medium/High",
"confidence":0,
"health_score":0,
"abnormal_values":[

],
"recommendations":[

],
"emergency":true
}}

{format}
""",
    input_variables=["context", "text"],
    partial_variables={
        "format": parser.get_format_instructions()
    }
)

chain = prompt | llm | parser


def diagnosis_agent(state):
    result = chain.invoke({
        "context": state["context"],
        "text": state["text"]
    })
    state["diagnosis"] = result
    return state


print("Rakesh prajapat end")