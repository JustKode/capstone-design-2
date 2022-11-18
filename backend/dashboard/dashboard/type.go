package dashboard

type ErrorMessage struct {
	Message string `json:"message"`
}

type NodeType struct {
	Id    string `json:"id"`
	Value int32  `json:"value"`
	Group string `json:"group"`
}

type LinkType struct {
	Source string `json:"source"`
	Target string `json:"target"`
	Value  int32  `json:"value"`
}

type ComponentType struct {
	Time       int32  `json:"time"`
	ObjectId   string `json:"objectId"`
	ActionType string `json:"actionType"`
}

type ComponentScoreType struct {
	Score    float64 `json:"score"`
	ObjectId string  `json:"objectId"`
}

type PageLogResult struct {
	Nodes []NodeType `json:"nodes"`
	Links []LinkType `json:"links"`
}
