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

func LatestEventHandler(category model.Category) http.Handler {
	events := maps.Values(model.GetEvents())
	slices.SortFunc(events, func(a, b model.Event) bool {
		return a.Timestamp < b.Timestamp
	})

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		now := time.Now().Unix()

		for _, event := range events {
			if event.Timestamp+86400 > now && event.Category == category {
				http.Redirect(w, r, "https://"+r.Host+"/events/"+event.Route, http.StatusTemporaryRedirect)
				return
			}
		}

		http.Redirect(w, r, "https://"+r.Host, http.StatusTemporaryRedirect)
	})
}

func LatestRegisterEventHandler() http.Handler {
	events := maps.Values(model.GetEvents())
	slices.SortFunc(events, func(a, b model.Event) bool {
		return a.Timestamp < b.Timestamp
	})

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		now := time.Now().Unix()

		for _, event := range events {
			if len(event.Links) == 0 {
				continue
			}

			for _, link := range event.Links {
				if link.Text == "Register" && link.OpenTime <= now {
					http.Redirect(w, r, link.URL, http.StatusTemporaryRedirect)
					return
				}
			}
		}

		http.Redirect(w, r, "https://"+r.Host, http.StatusTemporaryRedirect)
	})
}

func EventHandler() http.Handler {
	events := model.GetEvents()

	template, err := template.ParseFiles("assets/event.tmpl")
	if err != nil {
		log.Fatal("Error: Unable to parse the template file. (Event)")
		return nil
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		eventId := getEventIdFromURL(r.URL)

		event, exists := events[eventId]
		if !exists {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		now := time.Now().Unix()
		for index, link := range event.Links {
			event.Links[index].Show = link.OpenTime <= now
		}

		template.Execute(w, event)
	})
}

func getEventIdFromURL(url *url.URL) string {
	path := strings.TrimSuffix(url.Path, "/")
	pathFragments := strings.Split(path, "/")

	return pathFragments[len(pathFragments)-1]
}
