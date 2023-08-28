package middleware

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var DatabaseKey = "db"

func initAndMigrate(db *sql.DB) {
	// Database Initialization
	transaction, err := db.Begin()
	if err != nil {
		log.Fatal("Unable to begin transation for database initialization", err)
		return
	}

	transaction.Exec(`CREATE TABLE IF NOT EXISTS categories (
		id int unsigned NOT NULL AUTO_INCREMENT,
		name varchar(256) NOT NULL,
		PRIMARY KEY (id)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)

	transaction.Exec(`CREATE TABLE IF NOT EXISTS events (
		id int unsigned NOT NULL AUTO_INCREMENT,
		category_id int NOT NULL,
		body text NOT NULL,
		dateEnd timestamp NULL DEFAULT NULL,
		dateStart timestamp NOT NULL,
		image text CHARACTER SET utf8mb4 NOT NULL,
		imageAlt text CHARACTER SET utf8mb4 NOT NULL,
		name text CHARACTER SET utf8mb4 NOT NULL,
		slug varchar(512) NOT NULL,
		PRIMARY KEY (id),
		UNIQUE KEY slug (slug)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)

	transaction.Exec(`CREATE TABLE IF NOT EXISTS links (
		id int unsigned NOT NULL AUTO_INCREMENT,
		event_id int NOT NULL,
		name varchar(256) CHARACTER SET utf8mb4 NOT NULL,
		position int NOT NULL,
		show_on datetime DEFAULT NULL,
		url varchar(2048) NOT NULL,
		PRIMARY KEY (id)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)

	err = transaction.Commit()
	if err != nil {
		log.Fatal("Error commiting transaction for database initialization", err)
		return
	}

	// Add hidden field to Events
	err = db.QueryRow("SHOW COLUMNS FROM `events` LIKE 'hidden'").Scan()
	if err == sql.ErrNoRows {
		db.Exec("ALTER TABLE events ADD hidden boolean NOT NULL DEFAULT false")
	}
}

func Database() gin.HandlerFunc {
	username, usernameExists := os.LookupEnv("OUTCLIMB_DB_USER")
	if !usernameExists {
		log.Fatal("Error: No database username provided")
		return func(c *gin.Context) {
			c.Status(http.StatusInternalServerError)
			c.Abort()
		}
	}

	password, passwordExists := os.LookupEnv("OUTCLIMB_DB_PASSWORD")
	if !passwordExists {
		log.Fatal("Error: No database password provided")
		return func(c *gin.Context) {
			c.Status(http.StatusInternalServerError)
			c.Abort()
		}
	}

	host, hostExists := os.LookupEnv("OUTCLIMB_DB_HOST")
	if !hostExists {
		log.Fatal("Error: No database hostname provided")
		return func(c *gin.Context) {
			c.Status(http.StatusInternalServerError)
			c.Abort()
		}
	}

	name, nameExists := os.LookupEnv("OUTCLIMB_DB_NAME")
	if !nameExists {
		log.Fatal("Error: No database name provided")
		return func(c *gin.Context) {
			c.Status(http.StatusInternalServerError)
			c.Abort()
		}
	}

	db, err := sql.Open("mysql", username+":"+password+"@("+host+")/"+name+"?parseTime=true")
	if err != nil {
		log.Fatal("Error: Unable to connect to MySQL server", err)
	}

	initAndMigrate(db)

	return func(c *gin.Context) {
		c.Set(DatabaseKey, db)
		c.Next()
	}
}
