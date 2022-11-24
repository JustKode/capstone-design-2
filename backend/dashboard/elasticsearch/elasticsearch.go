package elasticsearch

import (
	"bytes"
	"encoding/json"
	elasticSearch "github.com/elastic/go-elasticsearch/v7"
	"log"
)

var ElasticSearchClient *elasticSearch.Client

func init() {
	cfg := elasticSearch.Config{
		Addresses: []string{
			"http://elasticsearch:9200",
		},
	}

	elasticSearchClient, err := elasticSearch.NewClient(cfg)
	ElasticSearchClient = elasticSearchClient

	if err != nil {
		panic(err)
	}
}

func GetDocsByIndexAndUserId(index string, userId string) []map[string]interface{} {
	client := ElasticSearchClient

	var buf bytes.Buffer
	var result map[string]interface{}

	query := map[string]interface{}{
		"query": map[string]interface{}{
			"match": map[string]interface{}{
				"userId": userId,
			},
		},
	}

	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		log.Fatalf("Error encoding query: %s", err)
	}

	res, err := client.Search(
		client.Search.WithIndex(index),
		client.Search.WithBody(&buf),
	)

	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}

	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			log.Fatalf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			log.Fatalf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	var resultDoc []map[string]interface{}

	for _, doc := range result["hits"].(map[string]interface{})["hits"].([]interface{}) {
		resultDoc = append(resultDoc, doc.(map[string]interface{})["_source"].(map[string]interface{}))
	}

	return resultDoc
}
