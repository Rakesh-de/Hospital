import time

from loguru import logger


class RequestLoggerMiddleware:

    def __init__(self, app):

        self.app = app

    async def __call__(

        self,

        scope,

        receive,

        send

    ):

        if scope["type"] != "http":

            await self.app(scope, receive, send)

            return

        start = time.time()

        async def send_wrapper(message):

            if message["type"] == "http.response.start":

                duration = (

                    time.time()

                    - start

                ) * 1000

                logger.info(

                    f"{scope['method']} "

                    f"{scope['path']} "

                    f"{duration:.2f} ms"

                )

            await send(message)

        await self.app(

            scope,

            receive,

            send_wrapper

        )