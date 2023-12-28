package api

import (
	"os"
	"regexp"

	"github.com/gin-gonic/gin"
)

type FrontendHandler struct{}

func NewFrontendHandler(router *gin.Engine) {
	frontendHandler := &FrontendHandler{}

	router.GET("/", frontendHandler.Index)
	router.GET("/index.html", frontendHandler.Index)
	router.GET("/assets/*filepath", frontendHandler.Assets)
	router.NoRoute(frontendHandler.Index)
}

func (*FrontendHandler) validateVersionQuery(version *string) bool {
	if *version == "assets" {
		return false
	}

	pattern := regexp.MustCompile("^[-_A-z0-9]+$")
	if !pattern.MatchString(*version) {
		return false
	}

	fileinfo, err := os.Stat("./dist/" + *version)
	if os.IsNotExist(err) || !fileinfo.IsDir() {
		return false
	}

	return true
}

func (f *FrontendHandler) Index(c *gin.Context) {
	version, exists := c.GetQuery("version")
	if exists && f.validateVersionQuery(&version) {
		c.Header("Content-Type", "text/html; charset=utf-8")
		c.File("./dist/" + version + "/index.html")
		return
	}

	c.Header("Content-Type", "text/html; charset=utf-8")
	c.File("./dist/index.html")
}

func (f *FrontendHandler) Assets(c *gin.Context) {
	filePath := c.Param("filepath")

	version, exists := c.GetQuery("version")
	if exists && f.validateVersionQuery(&version) {
		c.File("./dist/" + version + "/assets/" + filePath)
		return
	}

	c.File("./dist/assets/" + filePath)
}
