package main

import (
	"os"

	"github.com/goccy/go-json"
)

func (a *App) GetAllCookies() (resp JSResp) {
	f, err := os.ReadFile(a.jarFile)
	if err != nil {
		resp.Msg = "Error! Cannot get cookies"
		return
	}
	var data []map[string]interface{}
	if err := json.Unmarshal(f, &data); err != nil {
		resp.Msg = "Error! Cannot get cookies"
		return
	}
	resp.Success = true
	resp.Msg = "Cookies fetched successfully"
	resp.Data = data
	return
}
