FROM node:12.11.1-alpine as build-step

WORKDIR /app

COPY . .

ENV PORT=4200

RUN npm install
RUN npm run build

FROM nginx:1.16.0-alpime as prod-stage
COPY --from=build-step /app/dist/knights-ui /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "deamon off;" ]