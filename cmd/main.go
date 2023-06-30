package main

import (
	"log"
	"net/http"

	"github.com/NicholeMattera/Outclimb.gay/internal/api"
)

func main() {
	mux := http.NewServeMux()
	api.SetupRouter(mux)
	log.Fatal(http.ListenAndServe(":8080", mux))
}
