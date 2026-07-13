import os

from langchain_community.document_loaders import PyPDFLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter

from rag.vector_db import vector_db


def ingest_documents():

    folder = "medical_docs"

    splitter = RecursiveCharacterTextSplitter(

        chunk_size=800,

        chunk_overlap=100

    )

    documents = []

    for file in os.listdir(folder):

        if file.endswith(".pdf"):

            loader = PyPDFLoader(

                os.path.join(folder, file)

            )

            docs = loader.load()

            chunks = splitter.split_documents(docs)

            documents.extend(chunks)

    print(f"Total chunks = {len(documents)}")

    if len(documents) == 0:
     raise Exception("No PDF documents found in medical_docs folder.")

    vector_db.add_documents(documents)

    vector_db.persist()

    print("Medical documents indexed successfully.")