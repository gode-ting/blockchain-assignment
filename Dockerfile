FROM node:8

WORKDIR /home/node/app

ENV BUILD_LIST git

RUN apt-get install $BUILD_LIST \
    && git clone https://github.com/gode-ting/blockchain-assignment.git / \
    && cd blockchain-assignment \
    && npm install \
    && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 3001 3002 3003 3004
