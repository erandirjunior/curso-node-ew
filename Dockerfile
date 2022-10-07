FROM node:lts

RUN mkdir /app

WORKDIR /app

COPY --chown=node:node . .

EXPOSE 8080

CMD /bin/sh