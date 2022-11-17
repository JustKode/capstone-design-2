package dashboard

import (
	"dashboard/elasticsearch"
	"github.com/gofiber/fiber/v2"
)

func GetPageGraph(c *fiber.Ctx) error {
	userId := c.Query("userId")

	if userId == "" {
		data := ErrorMessage{
			Message: "Query Error",
		}
		return c.JSON(data)
	}

	pageLogs := elasticsearch.GetDocsByIndexAndUserId("page_log", userId)
	pageMoveLogs := elasticsearch.GetDocsByIndexAndUserId("page_move_log", userId)

	var nodes []NodeType
	var links []LinkType

	for _, doc := range pageLogs {
		value := int32(doc["count"].(float64))

		nodes = append(nodes, NodeType{
			Id:    doc["path"].(string),
			Group: "null",
			Value: value,
		})
	}

	for _, doc := range pageMoveLogs {
		value := int32(doc["count"].(float64))

		links = append(links, LinkType{
			Source: doc["source"].(string),
			Target: doc["target"].(string),
			Value:  value,
		})
	}

	pageLogResult := PageLogResult{
		Nodes: nodes,
		Links: links,
	}

	return c.JSON(pageLogResult)
}

func GetComponentReactTime(c *fiber.Ctx) error {
	userId := c.Query("userId")

	if userId == "" {
		data := ErrorMessage{
			Message: "Query Error",
		}
		return c.JSON(data)
	}

	componentLogs := elasticsearch.GetDocsByIndexAndUserId("component_log", userId)

	var results []ComponentType

	for _, doc := range componentLogs {
		results = append(results, ComponentType{
			Time:       int32(doc["time"].(float64)),
			ObjectId:   doc["objectId"].(string),
			ActionType: doc["actionType"].(string),
		})
	}

	return c.JSON(results)
}
