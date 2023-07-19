package api

import (
	"net/http"
	"time"

	"github.com/NicholeMattera/Outclimb.gay/internal/model"
	"github.com/gin-gonic/gin"
	"golang.org/x/exp/maps"
	"golang.org/x/exp/slices"
)

type RedirectHandler struct{}

func NewRedirectHandler(router *gin.Engine) {
	redirectHandler := &RedirectHandler{}

	router.GET("/", redirectHandler.Home)
	router.GET("/donate", redirectHandler.Donate)
	router.GET("/register", redirectHandler.Register)
}

func (*RedirectHandler) Home(c *gin.Context) {
	c.Redirect(http.StatusTemporaryRedirect, "https://linktr.ee/OutClimbMN")
}

func (*RedirectHandler) Donate(c *gin.Context) {
	c.Redirect(http.StatusTemporaryRedirect, "https://gofund.me/ca5465d4")
}

func (*RedirectHandler) Register(c *gin.Context) {
	now := time.Now().Unix()

	events := maps.Values(model.GetEvents())
	slices.SortFunc(events, func(a, b model.Event) bool {
		return a.Timestamp < b.Timestamp
	})

	for _, event := range events {
		if len(event.Links) == 0 {
			continue
		}

		for _, link := range event.Links {
			if link.Text == "Register" && link.OpenTime <= now {
				c.Redirect(http.StatusTemporaryRedirect, link.URL)
				return
			}
		}
	}

	schema := "https://"
	if c.Request.TLS == nil {
		schema = "http://"
	}

	c.Redirect(http.StatusTemporaryRedirect, schema+c.Request.Host)
}
