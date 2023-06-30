package api

import (
	"log"
	"net/http"
	"text/template"
)

func ContactHandler() http.Handler {
	template, err := template.ParseFiles("assets/contact.tmpl")
	if err != nil {
		log.Fatal("Error: Unable to parse the template file. (Contact)")
		return nil
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		template.Execute(w, nil)
	})
}
