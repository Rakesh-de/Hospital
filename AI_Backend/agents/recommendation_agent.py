from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0
)

parser = JsonOutputParser()

prompt = PromptTemplate(

template="""

You are a senior physician.

Disease

{disease}

Generate

1. Medicines (General suggestion only)

2. Diet

3. Exercise

4. Lifestyle

5. Next medical tests

Return JSON only.

{format}

""",

input_variables=["disease"],

partial_variables={

"format":parser.get_format_instructions()

}

)

chain = prompt | llm | parser


def recommendation_agent(state):

    disease = state["diagnosis"]["disease"]

    result = chain.invoke({

        "disease": disease

    })

    state["recommendation"] = result

    return state