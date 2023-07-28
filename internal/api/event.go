package api

import (
	"database/sql"
	"net/http"

	"github.com/NicholeMattera/Outclimb.gay/internal/api/middleware"
	"github.com/NicholeMattera/Outclimb.gay/internal/model"
	"github.com/gin-gonic/gin"
)

type eventTakeBinding struct {
	Slug string `uri:"slug" binding:"required"`
}

type EventHandler struct{}

func NewEventHandler(routerGroup *gin.RouterGroup) {
	eventHandler := &EventHandler{}

	eventsRouterGroup := routerGroup.Group("/events")
	eventsRouterGroup.GET("/", eventHandler.List)
	eventsRouterGroup.GET("/:slug", eventHandler.Take)
}

func (*EventHandler) List(c *gin.Context) {
	db, _ := c.Get(middleware.DatabaseKey)
	events, err := model.GetEvents(db.(*sql.DB))
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	publicEvents := make([]model.EventPublic, len(events))
	for index, event := range events {
		publicEvents[index] = event.Public()
	}

	c.IndentedJSON(http.StatusOK, publicEvents)
}

func (*EventHandler) Take(c *gin.Context) {
	var binding eventTakeBinding
	if err := c.ShouldBindUri(&binding); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	db, _ := c.Get(middleware.DatabaseKey)
	event, err := model.GetEvent(db.(*sql.DB), binding.Slug)
	if err != nil {
		if err == sql.ErrNoRows {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.AbortWithStatus(http.StatusInternalServerError)
		}

		return
	}

	c.IndentedJSON(http.StatusOK, event.Public())
}
