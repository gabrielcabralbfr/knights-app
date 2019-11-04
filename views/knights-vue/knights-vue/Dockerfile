FROM node:12.11.1-alpine

WORKDIR /app

COPY . .

ENV PORT=8080

RUN npm install
RUN npm install -g @vue/cli
EXPOSE ${PORT}
CMD [ "npm", "run", "serve" ]