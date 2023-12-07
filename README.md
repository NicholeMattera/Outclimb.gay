# Outclimb.gay

Outclimb.gay is a website for Outclimb, a Minneapolis-based organization dedicated to making climbing accessible to as many trans and queer people as possible.

## Running Through Docker

1. In the `docker-compose.yml` make sure to change the `OUTCLIMB_DB_PASSWORD` under the `backend` service and `MARIADB_PASSWORD` under the `db` service to something more secure
2. Run `docker-compose build` to build the images
3. Run `docker-compose up -d` to run the containers

## Running Just the Backend Locally

1. Make sure you have both Go v1.20 and MySQL/MariaDB installed locally
2. Create a database and user in your database for the service to use. Make sure the user has appropriate permissions to the database.
3. Set the following environment variables:
    - `OUTCLIMB_DB_HOST` - The address of the server. (Ex. localhost or 127.0.0.1)
    - `OUTCLIMB_DB_NAME` - The name of the database you created in step 2. (Ex. outclimb)
    - `OUTCLIMB_DB_USER` - The username of the user you created in step 2. (Ex. outclimb)
    - `OUTCLIMB_DB_PASSWORD` - The password for the user you created in step 2.
4. From the root of the project run `go mod download && go mod verify` to download all the backend dependencies.
5. From the root of the project run `go run cmd/main.go` to run the service.

## Running Just the Frontend Locally

1. Make sure you have Node v18 installed. If you use NVM (Node Version Manager) then run `nvm use` from the root of the project.
2. Run `npm ci` to download all the frontend dependencies.
3. Run `npm run dev` to run the frontend service
