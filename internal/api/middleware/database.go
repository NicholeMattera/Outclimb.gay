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

func Database(c *gin.Context) {
	if username, usernameExists := os.LookupEnv("OUTCLIMB_DB_USER"); !usernameExists {
		log.Fatal("Error: No database username provided")
	} else if password, passwordExists := os.LookupEnv("OUTCLIMB_DB_PASSWORD"); !passwordExists {
		log.Fatal("Error: No database password provided")
	} else if host, hostExists := os.LookupEnv("OUTCLIMB_DB_HOST"); !hostExists {
		log.Fatal("Error: No database hostname provided")
	} else if name, nameExists := os.LookupEnv("OUTCLIMB_DB_NAME"); !nameExists {
		log.Fatal("Error: No database name provided")
	} else if db, err := sql.Open("mysql", username+":"+password+"@("+host+")/"+name+"?parseTime=true"); err != nil {
		log.Fatal("Error: Unable to connect to MySQL server", err)
	} else {
		c.Set(DatabaseKey, db)
		c.Next()
		return
	}

	c.Status(http.StatusInternalServerError)
	c.Abort()
}
