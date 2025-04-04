package main

import (
	"os"

	"github.com/goccy/go-json"
)

func (a *App) GetSettings() (resp JSResp) {
	f, err := os.ReadFile(a.settings)
	if err != nil {
		resp.Msg = "Error! Cannot get settings"
		return
	}
	var s map[string]string
	err = json.Unmarshal(f, &s)
	if err != nil {
		resp.Msg = "Error! Cannot get settings"
		return
	}

	resp.Success = true
	resp.Msg = "Settings fetched successfully"
	resp.Data = s
	return
}

func (a *App) SetSettings(key, value string) (resp JSResp) {
	f, err := os.ReadFile(a.settings)
	if err != nil {
		resp.Msg = "Error! Cannot set settings"
		return
	}
	var s map[string]string
	err = json.Unmarshal(f, &s)
	if err != nil {
		resp.Msg = "Error! Cannot set settings"
		return
	}
	s[key] = value
	b, err := json.Marshal(s)
	if err != nil {
		resp.Msg = "Error! Cannot set settings"
		return
	}
	err = os.WriteFile(a.settings, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot set settings"
		return
	}

	resp.Success = true
	resp.Msg = "Settings set successfully"
	resp.Data = s
	return
}
