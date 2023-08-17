FROM node:lts AS frontend

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build


FROM golang:1.20-alpine AS backend

COPY --from=frontend /app /app
WORKDIR /app

RUN apk --no-cache add curl

RUN go mod download && go mod verify
RUN go build -v -o /app/outclimb cmd/main.go

CMD ["/app/outclimb"]
