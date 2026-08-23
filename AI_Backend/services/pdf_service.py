# from pypdf import PdfReader


# class PDFService:

#     def extract_text(self, pdf_path):

#         reader = PdfReader(pdf_path)

#         text = ""

#         for page in reader.pages:

#             try:

#                 text += page.extract_text()

#             except:

#                 pass

#         return text


# import fitz

# def extract_pdf_text(pdf_path):
#     document = fitz.open(pdf_path)
#     text = ""
#     for page in document:
#         text += page.get_text()
#     document.close()
#     return text


import fitz


def extract_pdf_text(pdf_path):

    document = fitz.open(pdf_path)

    text = ""

    for page in document:

        page_text = page.get_text()

        text += page_text + "\n"

    document.close()

    return text.strip()