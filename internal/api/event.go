package api

import (
	"log"
	"net/http"
	"net/url"
	"strings"
	"text/template"
	"time"

	"github.com/NicholeMattera/Outclimb.gay/internal/model"
	"golang.org/x/exp/maps"
	"golang.org/x/exp/slices"
)

func LatestEventHandler() http.Handler {
	events := maps.Values(model.GetEvents())
	slices.SortFunc(events, func(a, b model.Event) bool {
		return a.Timestamp < b.Timestamp
	})

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		now := time.Now().Unix()

		for _, event := range events {
			if event.Timestamp > now {
				log.Printf("%s", "https://outclimb.gay/events/"+event.Route)
				http.Redirect(w, r, "https://outclimb.gay/events/"+event.Route, http.StatusTemporaryRedirect)
				break
			}
		}
	})
}

func EventHandler() http.Handler {
	events := model.GetEvents()

	template, err := template.ParseFiles("assets/event.tmpl")
	if err != nil {
		log.Fatal("Error: Unable to parse the template file. (Home)")
		return nil
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		eventId := getEventIdFromURL(r.URL)

		event, exists := events[eventId]
		if !exists {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		template.Execute(w, event)
	})
}

func getEventIdFromURL(url *url.URL) string {
	path := strings.TrimSuffix(url.Path, "/")
	pathFragments := strings.Split(path, "/")

	return pathFragments[len(pathFragments)-1]
}
