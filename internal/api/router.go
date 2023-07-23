package api

import (
	"github.com/NicholeMattera/Outclimb.gay/internal/api/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(middleware.Database)

	router.Static("/static", "./static")

	NewRedirectHandler(router)
	NewEventHandler(router)
	NewContactHandler(router)

	return router
}
