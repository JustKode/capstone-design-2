package logging

type Log struct {
	UserId     string `json:"userId"`
	Timestamp  int32  `json:"timestamp"`
	Doing      bool   `json:"doing"`
	ActionType string `json:"actionType"`
	ObjectId   string `json:"objectId"`
}
