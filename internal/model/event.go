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
	Body         string       `json:"body"`
	EndTime      int64        `json:"endTime"`
	Image        string       `json:"image"`
	Image2x	     string       `json:"image2x"`
	ImageAlt     string       `json:"imageAlt"`
	SmallImage   string       `json:"smallImage"`
	SmallImage2x string       `json:"smallImage2x"`
	Links        []LinkPublic `json:"links"`
	Name         string       `json:"name"`
	Slug         string       `json:"slug"`
	StartTime    int64        `json:"startTime"`
}

type Event struct {
	Body         string
	Category     string
	DateEnd      sql.NullTime
	DateStart    time.Time
	Id           int
	Image        string
	Image2x      sql.NullString
	SmallImage   sql.NullString
	SmallImage2x sql.NullString
	ImageAlt     string
	Links        []Link
	Name         string
	Slug         string
}

func (e *Event) Public() EventPublic {
	var endTime int64

	if e.DateEnd.Valid {
		endTime = e.DateEnd.Time.UnixMilli()
	}

	links := make([]LinkPublic, len(e.Links))
	for index, link := range e.Links {
		links[index] = link.Public()
	}

	var image2x string
	if e.Image2x.Valid {
		image2x = e.Image2x.String
	}

	var smallImage string
	if e.SmallImage.Valid {
		smallImage = e.SmallImage.String
	}

	var smallImage2x string
	if e.SmallImage2x.Valid {
		smallImage2x = e.SmallImage2x.String
	}

	return EventPublic{
		Body:         e.Body,
		EndTime:      endTime,
		Image:        e.Image,
		Image2x:      image2x,
		SmallImage:   smallImage,
		SmallImage2x: smallImage2x,
		ImageAlt:     e.ImageAlt,
		Links:        links,
		Name:         e.Name,
		Slug:         e.Slug,
		StartTime:    e.DateStart.UnixMilli(),
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
			events.image2x,
			events.smallImage,
			events.smallImage2x,
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
		err = rows.Scan(&event.Id, &event.Category, &event.Body, &event.DateEnd, &event.DateStart, &event.Image, &event.Image2x, &event.SmallImage, &event.SmallImage2x, &event.ImageAlt, &event.Name, &event.Slug)
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
			events.image2x,
			events.smallImage,
			events.smallImage2x,
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
	err = row.Scan(&event.Id, &event.Category, &event.Body, &event.DateEnd, &event.DateStart, &event.Image, &event.Image2x, &event.SmallImage, &event.SmallImage2x, &event.ImageAlt, &event.Name, &event.Slug)
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
			events.image2x,
			events.smallImage,
			events.smallImage2x,
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
	err = row.Scan(&event.Id, &event.Category, &event.Body, &event.DateEnd, &event.DateStart, &event.Image, &event.Image2x, &event.SmallImage, &event.SmallImage2x, &event.ImageAlt, &event.Name, &event.Slug)
	if err != nil {
		return Event{}, err
	}

	event.Links, err = GetLinks(db, &event)
	if err != nil {
		return
	}

	return event, nil
}
