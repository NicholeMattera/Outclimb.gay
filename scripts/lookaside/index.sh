#!/bin/sh

echo "🧹 Cleaning up temp directory"
rm -rf /tmp/outclimb-lookaside

echo "📦 Downloading the latest"
git clone --brance $2 --depth 1 https://github.com/OutClimb/Outclimb.gay.git /tmp/outclimb-lookaside
cd /tmp/outclimb-lookaside

if [ $1 = "create" ]; then
    docker build --build-arg="BRANCH_NAME=$2" --tag outclimbgay_create-lookaside:latest -f scripts/lookaside/create-lookaside.dockerfile .
    docker run -e BRANCH_NAME=$2 -v outclimbgay3_lookasides:/lookaside outclimbgay_create-lookaside

    echo "🧹 Cleaning up container and image"
    docker container rm outclimbgay_create-lookaside
    docker image rm outclimbgay_create-lookaside:latest
else if [ $1 = "delete" ]; then
    docker build --tag outclimbgay_delete-lookaside:latest -f scripts/lookaside/delete-lookaside.dockerfile .
    docker run -e BRANCH_NAME=$2 -v outclimbgay3_lookasides:/lookaside outclimbgay_delete-lookaside

    echo "🧹 Cleaning up container and image"
    docker container rm outclimbgay_delete-lookaside
    docker image rm outclimbgay_delete-lookaside:latest
else
  echo "🚨 Invalid command"
  exit 1
fi

echo "🧹 Cleaning up temp directory"
rm -rf /tmp/outclimb-lookaside
