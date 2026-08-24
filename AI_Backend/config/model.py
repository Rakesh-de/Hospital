import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq

load_dotenv()


from langchain_groq import ChatGroq

llm = ChatGroq(
    #model="llama-3.3-70b-versatile",
    model="openai/gpt-oss-120b",
    temperature=0.5,
    
)

print("rakesh")
# from config.model import llm
# response = llm.invoke("Hello")