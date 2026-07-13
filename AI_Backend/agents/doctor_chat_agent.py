from langchain_groq import ChatGroq

from langchain_core.prompts import ChatPromptTemplate

llm = ChatGroq(

    model="llama-3.3-70b-versatile",

    temperature=0

)

prompt = ChatPromptTemplate.from_messages(

[

(

"system",

"""

You are an experienced physician.

Answer ONLY using

1 Uploaded Report

2 Medical Context

Never guess.

If information is unavailable say

"I cannot determine this from the report."

"""

),

(

"human",

"""

Medical Context

{context}

Diagnosis

{diagnosis}

Recommendations

{recommendation}

Question

{question}

"""

)

]

)

chain = prompt | llm


def doctor_chat_agent(state):

    answer = chain.invoke(

    {

        "context":state["context"],

        "diagnosis":state["diagnosis"],

        "recommendation":state["recommendation"],

        "question":state["question"]

    }

    )

    state["answer"]=answer.content

    return state