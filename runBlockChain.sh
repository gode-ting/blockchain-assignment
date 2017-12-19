#!/usr/bin/env bash
echo "Welcome to Group 9's Blockchain Assignment!"
echo "Getting required files.."

wget https://raw.githubusercontent.com/gode-ting/blockchain-assignment/master/Dockerfile

wget https://raw.githubusercontent.com/gode-ting/blockchain-assignment/master/docker-compose.yml

echo "Done.."
echo "Setting up nodes.."
# Check if docker containers exists
CONTAINER_NAME='node1'
# Checking if docker container with $CONTAINER_NAME name exists.
COUNT=$(docker ps -a | grep "$CONTAINER_NAME" | wc -l)
if (($COUNT > 0)); then
    echo $CONTAINER_NAME' exists'
fi

#docker-compose build
docker-compose up -d

echo "Done.."
IP=$(curl -X GET http://127.0.0.1:3004/chain)

echo "Starting test"
echo "Blockchain:"
echo "$IP" 

IP2=$(curl -X POST '{
 "sender": "d4ee26eee15148ee92c6cd394edd974e",
 "recipient": "someone-other-address",
 "amount": 5
}' http://127.0.0.1:3004/transactions/new)

echo "$IP2"