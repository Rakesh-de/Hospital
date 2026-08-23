import os
from dotenv import load_dotenv

load_dotenv()

from langchain_groq import ChatGroq


llm = ChatGroq(
    model="qwen/qwen3.6-27b",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0
)


response = llm.invoke(
    "explain ai in simple terms"
)


print("Response:")
print(response.content)













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
    
#     #model="llama-3.1-8b-instant",
#     api_key=os.getenv("GROQ_API_KEY"),
#     model="qwen/qwen3.6-27b",
#     #model="llama-3.3-70b-versatile",
    
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

