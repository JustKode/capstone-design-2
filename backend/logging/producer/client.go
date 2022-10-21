package producer

import "github.com/confluentinc/confluent-kafka-go/kafka"

var Client *kafka.Producer

func init() {
	client, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": "localhost:9092"})
	Client = client

	if err != nil {
		panic(err)
	}
}
