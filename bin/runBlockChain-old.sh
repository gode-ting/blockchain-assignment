#!/usr/bin/env bash

##init variables
NODE1PEERSURL=$(curl -ss -X GET http://127.0.0.1:3001/peers)
NODE1CHAIN=$(curl -ss -X GET http://127.0.0.1:3001/chain)
NODE2CHAIN=$(curl -ss -X GET http://127.0.0.1:3002/chain)
NODE4TRANSACTION=$(curl -ss -X POST -d '{
 "sender": "d4ee26eee15148ee92c6cd394edd974e",
 "recipient": "someone-other-address",
 "amount": 5
}' http://127.0.0.1:3004/transactions/new)
NODE2MINE=$(curl -ss -X GET http://127.0.0.1:3002/mine)

echo "Welcome to Group 9's Blockchain Assignment!"
echo "Getting required files.."

mkdir "src"

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

echo "Done.."
echo "Setting up nodes.."
# Check if docker containers exists
CONTAINER_NAME='node1'
# Checking if docker container with $CONTAINER_NAME name exists.
COUNT=$(docker ps -a | grep "$CONTAINER_NAME" | wc -l)
if (($COUNT > 0)); then
    echo $CONTAINER_NAME' exists'
fi

docker-compose build
docker-compose up -d
sleep 10
echo "Done.."
echo
echo "Node 1: Confirming peers:" 
echo 
echo "$NODE1PEERSURL"
echo 
echo "RUNNING TEST SCENARIO ON BLOCKCHAIN"
echo
echo "Starting with Genesis Block"
echo
echo "Blockchain:"
echo
echo "$NODE1CHAIN" 
echo
echo "Node 4 making a new transaction calling: http://127.0.0.1:3004/transactions/new "
echo
echo "$NODE4TRANSACTION"
echo
printf "Node 2 mine\n\ncalling http://127.0.0.1:3002/mine\n"
printf "MINING..\n"
printf "$NODE2MINE"
printf "\n Updated Blockchain: \n"
printf "$NODE2CHAIN"