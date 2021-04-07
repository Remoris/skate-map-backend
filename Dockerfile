
FROM node:latest

WORKDIR /usr/src/skate-map-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "bin/www"]

USER node
