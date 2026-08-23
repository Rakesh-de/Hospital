from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from config.model import llm

parser = JsonOutputParser()

prompt = PromptTemplate(

    template="""

You are a Clinical Pharmacologist.

Normalize these medicines.

Medicine List

{medicine_list}

Return ONLY JSON.

{{
  "medicines": [
    {{
      "name": "",
      "generic_name": "",
      "brand_name": "",
      "category": "",
      "purpose": "",
      "dosage": "",
      "timing": "",
      "food_instruction": "",
      "duration": "",
      "common_side_effects": []
    }}
  ]
}}

{format}

""",

    input_variables=["medicine_list"],

    partial_variables={
        "format": parser.get_format_instructions()
    }

)

chain = prompt | llm | parser


def normalize_medicines(medicines):

    if not medicines:
        return []

    result = chain.invoke(
        {
            "medicine_list": medicines
        }
    )

    return result.get("medicines", [])