package api

import (
	"github.com/NicholeMattera/Outclimb.gay/internal/api/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(middleware.Database())

	// Frontend Routes
	router.StaticFile("/index.html", "./dist/index.html")
	router.Static("/assets", "./dist/assets")
	router.NoRoute(func(c *gin.Context) {
		c.Header("Content-Type", "text/html; charset=utf-8")
		c.File("./dist/index.html")
    })

	// Redirect Routes
	NewRedirectHandler(router)

	// API v1
	apiV1RouterGroup := router.Group("/api/v1")
	NewPingHandler(apiV1RouterGroup)
	NewEventHandler(apiV1RouterGroup)

	return router
}
