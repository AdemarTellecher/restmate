package main

import (
	"fmt"
	"os"

	"github.com/goccy/go-json"
)

func (a *App) GetAllCookies() (resp JSResp) {
	f, err := os.ReadFile(a.jarFile)
	if err != nil {
		resp.Msg = "Error! Cannot get cookies"
		return
	}
	var data []map[string]any
	if err := json.Unmarshal(f, &data); err != nil {
		resp.Msg = "Error! Cannot get cookies"
		return
	}
	resp.Success = true
	resp.Msg = "Cookies fetched successfully"
	resp.Data = data
	return
}
func (a *App) DeleteCookies(name string) (resp JSResp) {
	fmt.Println("jarFile -> ", a.jarFile)
	fmt.Println("name -> ", name)
	f, err := os.ReadFile(a.jarFile)
	if err != nil {
		resp.Msg = "Error! Cannot delete cookies"
		return
	}
	var data []map[string]any
	if err := json.Unmarshal(f, &data); err != nil {
		resp.Msg = "Error! Cannot get cookies"
		return
	}
	var filter []map[string]any
	for i := range data {
		if data[i]["Domain"] != name {
			filter = append(filter, data[i])
		}
	}
	if len(filter) > 0 {
		b, err := json.Marshal(filter)
		if err != nil {
			resp.Msg = "Error! Cannot delete cookies"
			return
		}
		err = os.WriteFile(a.jarFile, b, 0644)
		if err != nil {
			resp.Msg = "Error! Cannot delete cookies"
			return
		}
	} else {
		err = os.WriteFile(a.jarFile, []byte("[]"), 0644)
		if err != nil {
			resp.Msg = "Error! Cannot delete cookies"
			return
		}

	}
	resp.Success = true
	resp.Msg = "Cookies fetched successfully"
	resp.Data = filter
	return
}
func (a *App) ClearAllCookies() (resp JSResp) {
	var data []map[string]any
	err := os.WriteFile(a.jarFile, []byte("[]"), 0644)
	if err != nil {
		resp.Msg = "Error! Cannot clear cookies"
		return
	}
	resp.Success = true
	resp.Msg = "Cookies cleared successfully"
	resp.Data = data
	return
}
