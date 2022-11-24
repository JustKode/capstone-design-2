package producer

import "github.com/confluentinc/confluent-kafka-go/kafka"

var Client *kafka.Producer

func init() {
	bootstrapServer := "localhost:9092"

	client, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": bootstrapServer})
	Client = client

	if err != nil {
		panic(err)
	}
}
