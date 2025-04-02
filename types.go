package main

type JSResp struct {
	Success bool   `json:"success"`
	Msg     string `json:"msg"`
	Data    any    `json:"data,omitempty"`
}

type KeyValue struct {
	ID     string `json:"id"`
	Key    string `json:"key"`
	Value  string `json:"value"`
	Active bool   `json:"active"`
}
type FormData struct {
	ID     string   `json:"id"`
	Key    string   `json:"key"`
	Value  string   `json:"value"`
	Files  []string `json:"files"`
	Type   string   `json:"type"`
	Active bool     `json:"active"`
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
	Variable []KV      `json:"variable"`
}

type KV struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}
type Result struct {
	StatusCode   int    `json:"statusCode"`
	HttpStatus   string `json:"httpStatus"`
	BodyContent  string `json:"bodyContent"`
	ErrorContent string `json:"errorContent"`
	ContentType  string `json:"contentType"`
	Duration     string `json:"duration"`
	Headers      []KV   `json:"headers"`
}
type ReqRsp struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Url    string `json:"url"`
	Method string `json:"method"`
	CollId string `json:"coll_id"`
}
type CollRsp struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	Requests []ReqRsp `json:"requests"`
	Variable []KV     `json:"variable"`
}

type Env struct {
	ID       string            `json:"id"`
	Name     string            `json:"name"`
	Variable map[string]string `json:"variable"`
}
