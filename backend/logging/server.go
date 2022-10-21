package main

import (
	"capstone/logging/router"
	"github.com/gofiber/fiber/v2"
	"log"
)

func main() {
	app := fiber.New()
	router.SetupRoutes(app)

	log.Fatal(app.Listen(":8000"))
}
