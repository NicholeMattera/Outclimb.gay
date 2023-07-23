package model

import (
	"database/sql"
)

type LinkPublic struct {
	Name string
	URL  string
}

type Link struct {
	Name string
	URL  string
}

func (l *Link) Public() LinkPublic {
	return LinkPublic{
		Name: l.Name,
		URL:  l.URL,
	}
}

func GetLinks(db *sql.DB, event *Event) (links []Link, err error) {
	query := `
		SELECT
			name,
			url
		FROM links
		WHERE
			event_id = ? AND
			(
				show_on IS NULL OR
				show_on < NOW()
			)
		ORDER BY position
	`
	rows, err := db.Query(query, event.Id)
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var link Link
		err = rows.Scan(&link.Name, &link.URL)
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
			name,
			url
		FROM links
		WHERE
		name = "Register" AND
		(
			show_on IS NULL OR
			show_on < NOW()
		)
		ORDER BY show_on DESC
		LIMIT 1
	`

	row := db.QueryRow(query)
	err = row.Scan(&link.Name, &link.URL)
	if err != nil {
		return
	}

	return
}
