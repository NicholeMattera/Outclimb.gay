FROM golang:1.20.6

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN go mod download && go mod verify
RUN go build -v -o /usr/local/bin/outclimb cmd/main.go

EXPOSE 8080

CMD [ "outclimb" ]
