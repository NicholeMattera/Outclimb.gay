package api

import (
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Static("/static", "./static")

	NewRedirectHandler(router)
	NewEventHandler(router)
	NewContactHandler(router)

	return router
}
