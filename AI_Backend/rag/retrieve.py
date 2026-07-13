from rag.vector_db import vector_db


retriever = vector_db.as_retriever(

    search_kwargs={
        "k": 5
    }

)


def retrieve_context(question: str):

    docs = retriever.invoke(question)

    context = "\n\n".join(

        [

            doc.page_content

            for doc in docs

        ]

    )

    return context