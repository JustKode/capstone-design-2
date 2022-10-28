package logging

import (
	"capstone/logging/producer"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/gofiber/fiber/v2"
	"github.com/vmihailenco/msgpack/v5"
)

func PostComponentLoggingHandler(c *fiber.Ctx) error {
	logs := new([]ComponentLog)

	if err := c.BodyParser(logs); err != nil {
		return err
	}

	message, err := msgpack.Marshal(logs)
	topic := "componentLog"

	// Parsing Error
	if err != nil {
		return err
	}

	err = producer.Client.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Value:          message,
	}, nil)

	// Kafka Error
	if err != nil {
		return err
	}

	return c.SendString("ok")
}

func PostPageLoggingHandler(c *fiber.Ctx) error {
	logs := new(PageLog)

	if err := c.BodyParser(logs); err != nil {
		return err
	}

	message, err := msgpack.Marshal(logs)
	topic := "pageLog"

	// Parsing Error
	if err != nil {
		return err
	}

	err = producer.Client.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Value:          message,
	}, nil)

	// Kafka Error
	if err != nil {
		return err
	}

	return c.SendString("ok")
}
