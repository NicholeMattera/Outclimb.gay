package model

import (
	"database/sql"
	"time"
)

const eventDateFormat = "Monday January 2"
const eventTimeFormat = "3:04pm"

const (
	RegularMeetup   string = "regular-meetup"
	OutdoorClimbing string = "outdoor-climbing"
	SkillsShare     string = "skills-share"
)

type EventPublic struct {
	Body      string
	EndDate   string
	EndTime   string
	Image     string
	ImageAlt  string
	Links     []LinkPublic
	Name      string
	Slug      string
	StartDate string
	StartTime string
}

type Event struct {
	Body      string
	Category  string
	DateEnd   sql.NullTime
	DateStart time.Time
	Id        int
	Image     string
	ImageAlt  string
	Links     []Link
	Name      string
	Slug      string
}

// Source: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
func getDayOrdinalSuffix(time time.Time) string {
	day := time.Local().Day()

	j := day % 10
	k := day % 100

	if j == 1 && k != 11 {
		return "st"
	}

	if j == 2 && k != 12 {
		return "nd"
	}

	if j == 3 && k != 13 {
		return "rd"
	}

	return "th"
}

func (e *Event) Public() EventPublic {
	endDate := ""
	endTime := ""

	if e.DateEnd.Valid {
		endDate = e.DateEnd.Time.Local().Format(eventDateFormat) + getDayOrdinalSuffix(e.DateEnd.Time)
		endTime = e.DateEnd.Time.Local().Format(eventTimeFormat)
	}

	links := make([]LinkPublic, len(e.Links))
	for index, link := range e.Links {
		links[index] = link.Public()
	}

	return EventPublic{
		Body:      e.Body,
		EndDate:   endDate,
		EndTime:   endTime,
		Image:     e.Image,
		ImageAlt:  e.ImageAlt,
		Links:     links,
		Name:      e.Name,
		Slug:      e.Slug,
		StartDate: e.DateStart.Local().Format(eventDateFormat) + getDayOrdinalSuffix(e.DateStart),
		StartTime: e.DateStart.Local().Format(eventTimeFormat),
	}
}

func GetEvents(db *sql.DB) (events []Event, err error) {
	query := `
		SELECT
			events.id,
			categories.name as category,
			events.body,
			events.dateEnd,
			events.dateStart,
			events.image,
			events.imageAlt,
			events.name,
			events.slug
		FROM events
		LEFT JOIN categories ON
			categories.id = events.category_id
		ORDER BY dateStart
	`
	rows, err := db.Query(query)
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var event Event
		err = rows.Scan(&event.Id, &event.Category, &event.Body, &event.DateEnd, &event.DateStart, &event.Image, &event.ImageAlt, &event.Name, &event.Slug)
		if err != nil {
			return
		}

		event.Links, err = GetLinks(db, &event)
		if err != nil {
			return
		}

		events = append(events, event)
	}

	return
}

func GetEvent(db *sql.DB, slug string) (event Event, err error) {
	query := `
		SELECT
			events.id,
			categories.name as category,
			events.body,
			events.dateEnd,
			events.dateStart,
			events.image,
			events.imageAlt,
			events.name,
			events.slug
		FROM events
		LEFT JOIN categories ON
			categories.id = events.category_id
		WHERE slug = ?
		ORDER BY dateStart
		LIMIT 1
	`
	row := db.QueryRow(query, slug)
	err = row.Scan(&event.Id, &event.Category, &event.Body, &event.DateEnd, &event.DateStart, &event.Image, &event.ImageAlt, &event.Name, &event.Slug)
	if err != nil {
		return
	}

	event.Links, err = GetLinks(db, &event)
	if err != nil {
		return
	}

	return
}

func GetNextEvent(db *sql.DB, category string) (event Event, err error) {
	query := `
		SELECT
			events.id,
			categories.name as category,
			events.body,
			events.dateEnd,
			events.dateStart,
			events.image,
			events.imageAlt,
			events.name,
			events.slug
		FROM events
		LEFT JOIN categories ON
			categories.id = events.category_id
		WHERE categories.name = ? AND dateStart > DATE_ADD(NOW(), INTERVAL -1 DAY)
		ORDER BY dateStart
		LIMIT 1
	`
	row := db.QueryRow(query, category)
	err = row.Scan(&event.Id, &event.Category, &event.Body, &event.DateEnd, &event.DateStart, &event.Image, &event.ImageAlt, &event.Name, &event.Slug)
	if err != nil {
		return Event{}, err
	}

	event.Links, err = GetLinks(db, &event)
	if err != nil {
		return
	}

	return event, nil
}

func GetRedirectSlug(slug string) (string, bool) {
	if slug == "20230527-outdoor-climbing-taylor-falls" {
		return "20230527-outdoor-climbing-saint-croix-falls", true
	}

	if slug == "20230716-outdoor-climbing-sugar-loaf-bluff" {
		return "20230716-outdoor-skills-sharing-sugar-loaf-bluff", true
	}

	return "", false
}
