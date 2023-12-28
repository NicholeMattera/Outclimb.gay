package api

import (
	"github.com/NicholeMattera/Outclimb.gay/internal/api/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(middleware.Database())

	// Frontend Routes
	NewFrontendHandler(router)

	// Redirect Routes
	NewRedirectHandler(router)

	// API v1
	apiV1RouterGroup := router.Group("/api/v1")
	NewPingHandler(apiV1RouterGroup)
	NewEventHandler(apiV1RouterGroup)

	return router
}
