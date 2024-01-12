FROM node:21-alpine3.17

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY ./src ./src

CMD npm start