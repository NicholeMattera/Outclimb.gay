package model

import (
	"database/sql"
	"time"
)

const (
	RegularMeetup   string = "regular-meetup"
	OutdoorClimbing string = "outdoor-climbing"
	SkillsShare     string = "skills-share"
)

type EventPublic struct {
	Body      string       `json:"body"`
	EndTime   int64        `json:"endTime"`
	Image     string       `json:"image"`
	ImageAlt  string       `json:"imageAlt"`
	Links     []LinkPublic `json:"links"`
	Name      string       `json:"name"`
	Slug      string       `json:"slug"`
	StartTime int64        `json:"startTime"`
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

func (e *Event) Public() EventPublic {
	var endTime int64;

	if e.DateEnd.Valid {
		endTime = e.DateEnd.Time.UnixMilli()
	}

	links := make([]LinkPublic, len(e.Links))
	for index, link := range e.Links {
		links[index] = link.Public()
	}

	return EventPublic{
		Body:      e.Body,
		EndTime:   endTime,
		Image:     e.Image,
		ImageAlt:  e.ImageAlt,
		Links:     links,
		Name:      e.Name,
		Slug:      e.Slug,
		StartTime: e.DateStart.UnixMilli(),
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
		WHERE hidden = 0
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
		WHERE slug = ? AND hidden = 0
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
		WHERE categories.name = ? AND dateStart > DATE_ADD(NOW(), INTERVAL -1 DAY) AND hidden = 0
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
