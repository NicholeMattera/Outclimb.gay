package api

import (
	"database/sql"
	"net/http"

	"github.com/NicholeMattera/Outclimb.gay/internal/api/middleware"
	"github.com/NicholeMattera/Outclimb.gay/internal/model"
	"github.com/gin-gonic/gin"
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
	db, _ := c.Get(middleware.DatabaseKey)

	schema := "https://"
	if c.Request.TLS == nil {
		schema = "http://"
	}

	link, err := model.GetNextRegisterLink(db.(*sql.DB))
	if err != nil || len(link.URL) == 0 {
		c.Redirect(http.StatusTemporaryRedirect, schema+c.Request.Host)
	}

	c.Redirect(http.StatusTemporaryRedirect, link.URL)
}
