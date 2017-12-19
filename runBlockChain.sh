#!/usr/bin/env bash
echo "Welcome to Group C's Blockchain Assignment!"
echo "Getting required files.."

git clone https://github.com/gode-ting/blockchain-assignment.git

cd blockchain-assignment

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
docker-compose up

echo "Done.."
