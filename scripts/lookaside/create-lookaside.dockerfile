FROM node:lts

COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build

CMD cp -r /app/dist /lookaside/${BRANCH_NAME}
