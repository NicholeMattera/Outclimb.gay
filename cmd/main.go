package main

import (
	"github.com/NicholeMattera/Outclimb.gay/internal/api"
)

func main() {
	r := api.SetupRouter()
	r.Run(":8080")
}
