package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type PingHandler struct{}

func NewPingHandler(routerGroup *gin.RouterGroup) {
	pingHandler := &PingHandler{}

	routerGroup.GET("/ping", pingHandler.Ping)
}

func (*PingHandler) Ping(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}
