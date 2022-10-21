package logging

type ComponentLog struct {
	UserId     string `json:"userId"`
	Timestamp  int32  `json:"timestamp"`
	Doing      bool   `json:"doing"`
	ActionType string `json:"actionType"`
	ObjectId   string `json:"objectId"`
}

type PageLog struct {
	UserId    string `json:"userId"`
	Timestamp int32  `json:"timestamp"`
	Pathname  string `json:"pathname"`
}
