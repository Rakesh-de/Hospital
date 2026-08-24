# import os
# import json
# import base64
# import re



# import os
# from dotenv import load_dotenv

# load_dotenv()
# from langchain_groq import ChatGroq
# from langchain_core.messages import HumanMessage

# llm = ChatGroq(
    
    
#     api_key=os.getenv("GROQ_API_KEY"),
#     # "openai/gpt-oss-120b",
#     model="qwen/qwen3.6-27b",
#     # model="qwen/qwen3.6-27b",
#     # model="llama-3.3-70b-versatile",
    
#     temperature=0
# )

# print("GROQ API:", os.getenv("GROQ_API_KEY"))


# def image_to_base64(path):
#     with open(path, "rb") as f:
#         return base64.b64encode(f.read()).decode("utf-8")


# def vision_agent(state):

#     print("========== VISION AGENT ==========")

#     image_path = state.get("image_path")

#     if not image_path:
#         print("No image path found.")
#         state["vision"] = {}
#         return state

#     if not os.path.exists(image_path):
#         print("Image not found:", image_path)
#         state["vision"] = {}
#         return state

#     try:

#         image = image_to_base64(image_path)

#         message = HumanMessage(
#             content=[
#                 {
#                     "type": "text",
#                     "text": """
# You are an expert medical document analyzer.

# Analyze this medical report.

# Extract ONLY visible information.

# Return ONLY VALID JSON.

# {
#     "report_type":"",
#     "ocr_text":"",
#     "doctor_notes":"",
#     "medicines":[
#         {
#             "name":"",
#             "dosage":"",
#             "timing":"",
#             "food_instruction":"",
#             "duration":""
#         }
#     ]
# }
# """
#                 },
#                 {
#                     "type": "image_url",
#                     "image_url": {
#                         "url": f"data:image/jpeg;base64,{image}"
#                     }
#                 }
#             ]
#         )

#         response = llm.invoke([message])

#         print("VISION RAW RESPONSE:")
#         print(response.content)

#         try:

#             content = response.content.strip()

#             match = re.search(r"\{[\s\S]*\}", content)

#             if match:
#                 state["vision"] = json.loads(match.group())
#             else:
#                 raise Exception("No JSON Found")

#         except Exception as e:
#             print("Vision JSON Parse Error:", e)
#             state["vision"] = {
#                 "report_type": "",
#                 "ocr_text": "",
#                 "doctor_notes": "",
#                 "medicines": []
#             }

#     except Exception as e:

#         print("Vision Agent Error:", e)

#         state["vision"] = {
#             "report_type": "",
#             "ocr_text": "",
#             "doctor_notes": "",
#             "medicines": []
#         }

#     print("========== END VISION ==========")

#     return state


import os
import json
import base64
import re
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage

load_dotenv()

# LLM Config: Multimodal extraction ke liye optimized parameters
llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="qwen/qwen3.6-27b",
    temperature=0
)

def image_to_base64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def vision_agent(state):
    print("========== VISION AGENT ==========")

    image_path = state.get("image_path")

    if not image_path or not os.path.exists(image_path):
        print("Image path missing or invalid:", image_path)
        state["vision"] = {
            "report_type": "Prescription",
            "ocr_text": "",
            "doctor_notes": "",
            "medicines": []
        }
        return state

    try:
        image = image_to_base64(image_path)

        message = HumanMessage(
            content=[
                {
                    "type": "text",
                    "text": """You are an expert medical OCR and prescription extraction model.
Analyze this medical image carefully. Extract all text and structure the prescription details.

CRITICAL REQUIREMENT: Output strictly RAW VALID JSON matching this exact structure. Do not output markdown codeblocks (no ```json).

{
    "report_type": "Prescription",
    "ocr_text": "Exact full text read from top to bottom",
    "doctor_notes": "Clinical symptoms, findings, diagnosis, vital signs (BP, PR) and instructions",
    "medicines": [
        {
            "name": "Medicine or Solution name",
            "dose": "Dosage amount (e.g., 10 ml, 2 sachets, 1 tablet)",
            "strength": "Concentration/Strength if mentioned (e.g., 5%, 500 mg, or --)",
            "timing": "Administration route and time (e.g., IV stat, twice daily, or --)",
            "duration": "Duration if mentioned (or --)",
            "purpose": "Purpose or reason if mentioned (or --)"
        }
    ]
}"""
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{image}"
                    }
                }
            ]
        )

        response = llm.invoke([message])
        content = response.content.strip()

        # Step 1: Handle <think> reasoning tags
        if "</think>" in content:
            content = content.split("</think>")[-1].strip()

        # Step 2: Clean Markdown blocks
        content = re.sub(r"^```json\s*", "", content, flags=re.MULTILINE)
        content = re.sub(r"^```\s*", "", content, flags=re.MULTILINE)
        content = re.sub(r"```$", "", content, flags=re.MULTILINE).strip()

        print("CLEAN VISION RESPONSE:\n", content)

        # Step 3: Direct JSON Parsing with Regex Fallback
        try:
            parsed_json = json.loads(content)
        except json.JSONDecodeError:
            match = re.search(r"\{[\s\S]*\}", content)
            if match:
                parsed_json = json.loads(match.group())
            else:
                raise Exception("JSON Parsing Completely Failed")

        state["vision"] = parsed_json

    except Exception as e:
        print("Vision Agent Error:", e)
        state["vision"] = {
            "report_type": "Prescription",
            "ocr_text": "",
            "doctor_notes": "",
            "medicines": []
        }

    print("========== END VISION ==========")
    return state