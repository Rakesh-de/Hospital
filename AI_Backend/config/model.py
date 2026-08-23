import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq

load_dotenv()


from langchain_groq import ChatGroq

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    #model ="llama-3.1-8b-instant",
    temperature=0.5,
    
)

print("rakesh")
# from config.model import llm
# response = llm.invoke("Hello")