# from langchain_huggingface import HuggingFaceEmbeddings

# from langchain_chroma import Chroma

# embedding = HuggingFaceEmbeddings(

#     model_name="sentence-transformers/all-MiniLM-L6-v2"

# )

# db = Chroma(

#     persist_directory="rag/chroma_db",

#     embedding_function=embedding

# )

# retriever = db.as_retriever(

#     search_kwargs={

#         "k":5

#     }

# )

# def rag_agent(state):

#     query = state["text"]

#     docs = retriever.invoke(query)

#     context = "\n\n".join(

#         [

#             doc.page_content

#             for doc in docs

#         ]

#     )

#     state["context"] = context

#     return state