package main

type (
	JSResp struct {
		Success bool   `json:"success"`
		Msg     string `json:"msg"`
		Data    any    `json:"data,omitempty"`
	}

	KeyValue struct {
		ID     string `json:"id"`
		Key    string `json:"key"`
		Value  string `json:"value"`
		Active bool   `json:"active"`
	}

	FormData struct {
		ID     string   `json:"id"`
		Key    string   `json:"key"`
		Value  string   `json:"value"`
		Files  []string `json:"files"`
		Type   string   `json:"type"`
		Active bool     `json:"active"`
	}

	Body struct {
		BodyType string     `json:"bodyType"`
		BodyRaw  string     `json:"bodyRaw"`
		FormData []FormData `json:"formData"`
	}

	Request struct {
		ID      string     `json:"id"`
		Name    string     `json:"name"`
		Url     string     `json:"url"`
		Method  string     `json:"method"`
		Headers []KeyValue `json:"headers"`
		Params  []KeyValue `json:"params"`
		Body    Body       `json:"body"`
		CollId  string     `json:"coll_id"`
	}

	Collection struct {
		ID       string    `json:"id"`
		Name     string    `json:"name"`
		Schema   string    `json:"schema"`
		Requests []Request `json:"requests"`
	}

	ExportCollection struct {
		Info struct {
			Schema string `json:"schema"`
			Name   string `json:"name"`
		} `json:"info"`
		Collection Collection `json:"collection"`
	}

	KV struct {
		Key   string `json:"key"`
		Value string `json:"value"`
	}

	Result struct {
		StatusCode   int    `json:"statusCode"`
		HttpStatus   string `json:"httpStatus"`
		BodyContent  string `json:"bodyContent"`
		ErrorContent string `json:"errorContent"`
		ContentType  string `json:"contentType"`
		Duration     string `json:"duration"`
		Headers      []KV   `json:"headers"`
	}

	ReqRsp struct {
		ID     string `json:"id"`
		Name   string `json:"name"`
		Url    string `json:"url"`
		Method string `json:"method"`
		CollId string `json:"coll_id"`
	}

	CollRsp struct {
		ID       string   `json:"id"`
		Name     string   `json:"name"`
		Requests []ReqRsp `json:"requests"`
	}

	Env struct {
		ID       string            `json:"id"`
		Name     string            `json:"name"`
		Selected bool              `json:"selected"`
		Variable map[string]string `json:"variable"`
	}

	PMCollection struct {
		Info struct {
			Schema string `json:"schema"`
			Name   string `json:"name"`
		} `json:"info"`
		Item []Item `json:"item"`
	}

	Item struct {
		Name    string `json:"name"`
		Item    []Item `json:"item,omitempty"`
		Request struct {
			Method string `json:"method"`
			Header []KV   `json:"header"`
			URL    struct {
				Raw string `json:"raw"`
			} `json:"url"`
			Body struct {
				Mode     string `json:"mode"`
				FormData []struct {
					KV
					Type string `json:"type"`
				} `json:"formdata"`
				Raw     string `json:"raw"`
				Options struct {
					Raw struct {
						Language string `json:"language"`
					} `json:"raw"`
				} `json:"options"`
			} `json:"body"`
		} `json:"request,omitempty"`
	}
)
