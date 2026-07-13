from langchain_community.document_loaders import PyPDFDirectoryLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_huggingface import HuggingFaceEmbeddings

from langchain_chroma import Chroma

loader = PyPDFDirectoryLoader("rag/medical_docs")

documents = loader.load()

splitter = RecursiveCharacterTextSplitter(

    chunk_size=800,

    chunk_overlap=100

)

docs = splitter.split_documents(documents)

embedding = HuggingFaceEmbeddings(

    model_name="sentence-transformers/all-MiniLM-L6-v2"

)

db = Chroma.from_documents(

    docs,

    embedding,

    persist_directory="rag/chroma_db"

)

print("Medical Database Created")