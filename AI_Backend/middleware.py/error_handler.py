from fastapi import Request
from fastapi.responses import JSONResponse
from loguru import logger


async def global_exception_handler(
    request: Request,
    exc: Exception
):

    logger.exception(exc)

    return JSONResponse(

        status_code=500,

        content={

            "success": False,

            "message": "Internal Server Error",

            "error": str(exc)

        }

    )