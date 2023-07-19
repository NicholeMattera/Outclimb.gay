package api

import (
	"log"
	"text/template"

	"github.com/gin-gonic/gin"
)

type ContactHandler struct {
	contactTemplate *template.Template
}

func NewContactHandler(router *gin.Engine) {
	contactHandler := &ContactHandler{}

	template, err := template.ParseFiles("assets/contact.tmpl")
	if err != nil {
		log.Fatal("Error: Unable to parse the template file. (Contact)")
		return
	}

	contactHandler.contactTemplate = template

	router.GET("/contact", contactHandler.Contact)
}

func (ch *ContactHandler) Contact(c *gin.Context) {
	ch.contactTemplate.Execute(c.Writer, nil)
}
