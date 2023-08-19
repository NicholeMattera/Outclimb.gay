package model

import (
	"database/sql"
	"time"
)

type LinkPublic struct {
	Disabled bool   `json:"disabled"`
	Name     string `json:"name"`
	ShowOn   int64  `json:"showOn"`
	URL      string `json:"url"`
}

type Link struct {
	Name   string
	ShowOn sql.NullTime
	URL    string
}

func (l *Link) Public() LinkPublic {
	ShowOn := int64(0)
	if l.ShowOn.Valid  {
		ShowOn = l.ShowOn.Time.UnixMilli()
	}

	return LinkPublic{
		Disabled: l.ShowOn.Valid && time.Now().Before(l.ShowOn.Time),
		Name:     l.Name,
		ShowOn:   ShowOn,
		URL:      l.URL,
	}
}

func GetLinks(db *sql.DB, event *Event) (links []Link, err error) {
	query := `
		SELECT
			name,
			show_on,
			url
		FROM links
		WHERE
			event_id = ?
		ORDER BY position
	`
	rows, err := db.Query(query, event.Id)
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var link Link
		err = rows.Scan(&link.Name, &link.ShowOn, &link.URL)
		if err != nil {
			links = []Link{}
			return
		}
		links = append(links, link)
	}

	return
}

func GetNextRegisterLink(db *sql.DB) (link Link, err error) {
	query := `
		SELECT
			links.name,
			links.url
		FROM links
		LEFT JOIN events ON links.event_id = events.id
		WHERE
			links.name = "Register" AND
			events.dateStart > NOW()
		ORDER BY show_on ASC
		LIMIT 1
	`

	row := db.QueryRow(query)
	err = row.Scan(&link.Name, &link.URL)
	if err != nil {
		return
	}

	return
}
