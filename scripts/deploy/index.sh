#!/bin/sh

echo "🧹 Cleaning up temp directory"
rm -rf /tmp/outclimb

echo "📦 Downloading the latest"
git clone --depth 1 https://github.com/OutClimb/Outclimb.gay.git /tmp/outclimb
cd /tmp/outclimb

echo "🩹 Patching configs"
patch -i ~/secrets.diff

echo "🛠️ Building"
docker compose build --no-cache

echo "🪦 Bringing down and removing old container"
docker container stop outclimb-outclimb-1
docker container rm outclimb-outclimb-1

echo "💡 Bringing up new container"
docker compose up --detach

echo "🧹 Cleaning up old images and temp directory"
docker image prune --all --force
rm -rf /tmp/outclimb
