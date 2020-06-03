FROM node:14-alpine
RUN npm install
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD node server.js 0.0.0.0