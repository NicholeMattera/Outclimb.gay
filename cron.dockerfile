FROM node:lts

COPY . /app
WORKDIR /app

RUN apt-get update && apt-get install -y cron
RUN npm ci

COPY scripts/generate_events/crontab /etc/cron.d/outclimb-crontab
RUN chmod 0644 /etc/cron.d/outclimb-crontab
RUN crontab /etc/cron.d/outclimb-crontab

CMD ["/bin/sh", "/app/scripts/generate_events/entrypoint.sh"]
