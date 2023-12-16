#!/bin/sh

echo "🧹 Cleaning up temp directory"
rm -rf /tmp/outclimb

echo "📦 Downloading the latest"
git clone https://github.com/NicholeMattera/Outclimb.gay.git /tmp/outclimb
cd /tmp/outclimb

echo "🩹 Patching configs"
patch -i ~/secrets.diff

echo "🛠️ Building"
docker compose build

echo "🪦 Bringing down and removing old container"
docker container stop outclimb-outclimb-1
docker container rm outclimb-outclimb-1

echo "💡 Bringing up new container"
docker compose up -d

echo "🧹 Cleaning up old images and temp directory"
docker image prune -a -f
rm -rf /tmp/outclimb
