FROM node:8

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

ENV BUILD_LIST git

RUN apt-get install $BUILD_LIST \
    && npm install 

COPY . /home/node/app

EXPOSE 3001 3002 3003 3004
