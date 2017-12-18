FROM node:8

WORKDIR /home/node/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001 3002 3003 3004
