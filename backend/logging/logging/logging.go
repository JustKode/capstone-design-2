package logging

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vmihailenco/msgpack/v5"
)

func PostComponentLoggingHandler(c *fiber.Ctx) error {
	logs := new([]Log)

	if err := c.BodyParser(logs); err != nil {
		return err
	}

	message, err := msgpack.Marshal(logs)
	println(message)

	if err != nil {
		return err
	}

	return c.SendString("ok")
}
