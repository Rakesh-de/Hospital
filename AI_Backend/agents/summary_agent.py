from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

llm = ChatGroq(
    model="llama-3.3-70b-versatile"
)

prompt = PromptTemplate(

template="""

Patient Diagnosis

{diagnosis}

Recommendations

{recommendation}

Write a concise medical summary.

""",

input_variables=[

"diagnosis",

"recommendation"

]

)

chain = prompt | llm


def summary_agent(state):

    summary = chain.invoke({

        "diagnosis": state["diagnosis"],

        "recommendation": state["recommendation"]

    })

    state["summary"] = summary.content

    return state