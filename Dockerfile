FROM node:8

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

ENV BUILD_LIST git

RUN apt-get install $BUILD_LIST \
    && git clone https://github.com/gode-ting/blockchain-assignment.git /home/node/app \
    && npm install \
	&& cp -a /blockchain-assignment/. /home/node/app \
    && rm -rf /var/lib/apt/lists/*

COPY . /home/node/app

EXPOSE 3001 3002 3003 3004
