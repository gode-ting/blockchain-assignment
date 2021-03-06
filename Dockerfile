FROM node:8

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

ENV BUILD_LIST git

COPY . /home/node/app

RUN apt-get install $BUILD_LIST \
    && npm install 



EXPOSE 3001 3002 3003 3004
