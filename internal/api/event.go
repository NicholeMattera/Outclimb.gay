package api

import (
	"database/sql"
	"log"
	"net/http"
	"text/template"

	"github.com/NicholeMattera/Outclimb.gay/internal/api/middleware"
	"github.com/NicholeMattera/Outclimb.gay/internal/model"
	"github.com/gin-gonic/gin"
)

type eventUriBinding struct {
	Slug string `uri:"slug" binding:"required"`
}

type EventHandler struct {
	eventTemplate *template.Template
}

func NewEventHandler(router *gin.Engine) {
	eventHandler := &EventHandler{}

	template, err := template.ParseFiles("assets/event.tmpl")
	if err != nil {
		log.Fatal("Error: Unable to parse the template file. (Event)")
		return
	}

	eventHandler.eventTemplate = template

	eventsRouterGroup := router.Group("/events")
	eventsRouterGroup.GET("/outdoor-climbing", eventHandler.OutdoorClimbingRedirect)
	eventsRouterGroup.GET("/outdoor-skills-sharing", eventHandler.OutdoorSkillsSharingRedirect)
	eventsRouterGroup.GET("/:slug", eventHandler.Event)
}

func (*EventHandler) getURL(r *http.Request, path string) string {
	schema := "https://"
	if r.TLS == nil {
		schema = "http://"
	}

	return schema + r.Host + path
}

func (e *EventHandler) OutdoorClimbingRedirect(c *gin.Context) {
	db, _ := c.Get(middleware.DatabaseKey)
	event, err := model.GetNextEvent(db.(*sql.DB), model.OutdoorClimbing)
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect, e.getURL(c.Request, "/"))
	}

	c.Redirect(http.StatusTemporaryRedirect, e.getURL(c.Request, "/events/"+event.Slug))
}

func (e *EventHandler) OutdoorSkillsSharingRedirect(c *gin.Context) {
	db, _ := c.Get(middleware.DatabaseKey)
	event, err := model.GetNextEvent(db.(*sql.DB), model.SkillsShare)
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect, e.getURL(c.Request, "/"))
	}

	c.Redirect(http.StatusTemporaryRedirect, e.getURL(c.Request, "/events/"+event.Slug))
}

func (e *EventHandler) Event(c *gin.Context) {
	var eventBinding eventUriBinding
	if err := c.ShouldBindUri(&eventBinding); err != nil {
		c.Redirect(http.StatusTemporaryRedirect, e.getURL(c.Request, "/"))
		return
	}

	slug, exists := model.GetRedirectSlug(eventBinding.Slug)
	if exists {
		c.Redirect(http.StatusPermanentRedirect, e.getURL(c.Request, "/events/"+slug))
		return
	}

	db, _ := c.Get(middleware.DatabaseKey)
	event, err := model.GetEvent(db.(*sql.DB), eventBinding.Slug)
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect, e.getURL(c.Request, "/"))
		return
	}

	e.eventTemplate.Execute(c.Writer, event.Public())
}
