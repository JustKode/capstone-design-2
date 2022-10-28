package main

import (
	"capstone/logging/producer"
	"capstone/logging/router"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	app := fiber.New()
	router.SetupRoutes(app)
	app.Use(cors.New(cors.Config{}))

	go func() {
		if err := app.Listen(":8000"); err != nil {
			log.Panic(err)
		}
	}()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	_ = <-c
	println("Gracefully shutting down...")
	_ = app.Shutdown()

	producer.Client.Close()
	fmt.Println("Fiber was successful shutdown.")
}
