package main

type Rsp struct {
	Success bool   `json:"success"`
	Msg     string `json:"msg"`
}
type KeyValue struct {
	ID     string `json:"id"`
	Key    string `json:"key"`
	Value  string `json:"value"`
	Active bool   `json:"active"`
}
type FormData struct {
	ID     string `json:"id"`
	Key    string `json:"key"`
	Value  string `json:"value"`
	Type   string `json:"type"`
	Active bool   `json:"active"`
}
type Body struct {
	BodyType string     `json:"bodyType"`
	BodyRaw  string     `json:"bodyRaw"`
	FormData []FormData `json:"formData"`
}
type Request struct {
	ID      string     `json:"id"`
	Name    string     `json:"name"`
	Url     string     `json:"url"`
	Method  string     `json:"method"`
	Headers []KeyValue `json:"headers"`
	Params  []KeyValue `json:"params"`
	Body    Body       `json:"body"`
	CollId  string     `json:"coll_id"`
}

type Collection struct {
	ID       string    `json:"id"`
	Name     string    `json:"name"`
	Requests []Request `json:"requests"`
}

type Header struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}
type Result struct {
	StatusCode   int      `json:"statusCode"`
	HttpStatus   string   `json:"httpStatus"`
	BodyContent  string   `json:"bodyContent"`
	ErrorContent string   `json:"errorContent"`
	ContentType  string   `json:"contentType"`
	Duration     string   `json:"duration"`
	Headers      []Header `json:"headers"`
}
