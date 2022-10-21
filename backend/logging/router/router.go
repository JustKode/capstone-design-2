package router

import (
	"capstone/logging/logging"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/log", logger.New())
	api.Post("/component", logging.PostComponentLoggingHandler)
}
