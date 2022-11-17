package router

import (
	"dashboard/dashboard"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/dashboard", logger.New())
	api.Get("/page", dashboard.GetPageGraph)
	api.Get("/component", dashboard.GetComponentReactTime)
}
