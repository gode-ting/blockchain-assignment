#!/usr/bin/env bash

##init variables
NODE3GENESIS=$(curl -ss -X GET http://127.0.0.1:3003/createGenesis)
NODE1CHAIN=$(curl -ss -X GET http://127.0.0.1:3001/chain)
NODE2CHAIN=$(curl -ss -X GET http://127.0.0.1:3002/chain)
NODE4TRANSACTION=$(curl -ss -X POST -d '{
 "sender": "d4ee26eee15148ee92c6cd394edd974e",
 "recipient": "someone-other-address",
 "amount": 5
}' http://127.0.0.1:3004/transactions/new)
NODE2TRANSACTION=$(curl -ss -X POST -d '{
 "sender": "d4ee26eee15148ee92c6cd394edd974e",
 "recipient": "someone-other-address",
 "amount": 10
}' http://127.0.0.1:3002/transactions/new)
NODE3MINE=$(curl -ss -X GET http://127.0.0.1:3003/mine)
NODE1MINE=$(curl -ss -X GET http://127.0.0.1:3001/mine)
NODE4CHAIN=$(curl -ss -X GET http://127.0.0.1:3004/chain)
NODE3CHAIN=$(curl -ss -X GET http://127.0.0.1:3003/chain)
RESOLVE2=$(curl -ss -X GET http://127.0.0.1:3001/nodes/resolve)


echo "Welcome to Group 9's Blockchain Assignment!"
echo "Getting required files.."

mkdir "tempDocker"
cd tempDocker
mkdir src

if [ ! -f Blockchain.js ]; then
	wget https://raw.githubusercontent.com/gode-ting/blockchain-assignment/master/src/Blockchain.js -P src
fi

if [ ! -f httpServer.js ]; then
	wget https://raw.githubusercontent.com/gode-ting/blockchain-assignment/master/src/httpServer.js -P src
fi

if [ ! -f package.json ]; then
	wget https://raw.githubusercontent.com/gode-ting/blockchain-assignment/master/package.json
fi

if [ ! -f index.js ]; then
	wget https://raw.githubusercontent.com/gode-ting/blockchain-assignment/master/index.js
fi

if [ ! -f Dockerfile ]; then
	wget https://raw.githubusercontent.com/gode-ting/blockchain-assignment/master/Dockerfile
fi

if [ ! -f docker-compose.yml ]; then
	wget https://raw.githubusercontent.com/gode-ting/blockchain-assignment/master/docker-compose.yml
fi

echo "Building images..."

docker-compose build

echo "Running containers..."

docker-compose up -d
sleep 30

echo "RUNNING TEST SCENARIO ON BLOCKCHAIN"
echo
echo "NODE 3 - CREATING GENESIS BLOCK"
echo
echo "$NODE3GENESIS" 
echo
echo "NODE 1 - DISPLAYING CHAIN"
echo
echo "$NODE1CHAIN" 
echo
echo "NODE 2 - DISPLAYING CHAIN"
echo
echo "$NODE2CHAIN" 
echo
echo "NODE 4 - MAKING TRANSACTION"
echo
echo "$NODE4TRANSACTION" 
echo
echo "NODE 2 - MAKING TRANSACTION"
echo "$NODE2TRANSACTION"
echo
echo "NODE 3 - MINING NEW BLOCK"
echo
echo "$NODE3MINE"
echo
echo "NODE 3 - DISPLAYING CHAIN"
echo
echo "$NODE3CHAIN"
echo
echo "NODE 4 - MAKING TRANSACTION"
echo
echo "$NODE4TRANSACTION"
echo
echo "NODE 1 - MINING NEW BLOCK"
echo
echo "$NODE3MINE"
echo 
echo "NODE 1 - DISPLAYING CHAIN"
echo
echo "$NODE1CHAIN" 


cd ..
rm -rf tempDocker








