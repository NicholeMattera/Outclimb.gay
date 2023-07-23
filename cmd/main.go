package main

import (
	"log"
	"time"

	"github.com/NicholeMattera/Outclimb.gay/internal/api"
)

func main() {
	// Set our timezone to be central time
	loc, err := time.LoadLocation("America/Chicago")
	if err != nil {
		log.Fatal("Unable to get local location")
		return
	}
	time.Local = loc

	// Setup our routes
	r := api.SetupRouter()

	// Run the server
	r.Run(":8080")
}
