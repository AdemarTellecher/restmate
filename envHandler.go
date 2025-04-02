package main

import (
	"os"

	"github.com/goccy/go-json"
	"github.com/matoous/go-nanoid/v2"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) AddEnv(name string) (resp JSResp) {
	if name == "" {
		resp.Msg = "Error! Cannot add env"
		return
	}
	f, err := os.ReadFile(a.env)
	if err != nil {
		resp.Msg = "Error! Cannot add env"
		return
	}
	var e []Env
	err = json.Unmarshal(f, &e)
	if err != nil {
		resp.Msg = "Error! Cannot add env"
		return
	}
	nid, err := gonanoid.New()
	if err != nil {
		resp.Msg = "Error! Cannot Add Env"
		return
	}
	newEnv := Env{
		ID:       nid,
		Name:     name,
		Variable: map[string]string{},
	}
	e = append(e, newEnv)
	b, err := json.Marshal(e)
	if err != nil {
		resp.Msg = "Error! Cannot add env"
		return
	}
	err = os.WriteFile(a.env, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot add env"
		return
	}
	resp.Success = true
	resp.Msg = "Env saved successfully"
	resp.Data = e
	return
}
func (a *App) DeleteEnv(id string) (resp JSResp) {
	if id == "" {
		resp.Msg = "Error! Cannot delete env"
		return
	}
	str, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:          runtime.QuestionDialog,
		Title:         "Delete Collection",
		Message:       "Are you sure you want to delete the Environment? All Variables in this Environment will be deleted permanently.",
		Buttons:       []string{"Yes", "No"},
		DefaultButton: "No",
	})
	if err != nil {
		resp.Msg = "Error! Cannot delete env"
		return
	}
	if str != "Yes" && str != "Ok" {
		resp.Msg = "Error! Cannot delete env"
		return
	}
	f, err := os.ReadFile(a.env)
	if err != nil {
		resp.Msg = "Error! Cannot delete env"
		return
	}
	var e []Env
	err = json.Unmarshal(f, &e)
	if err != nil {
		resp.Msg = "Error! Cannot delete env"
		return
	}
	for i := range e {
		if e[i].ID == id {
			e = append(e[:i], e[i+1:]...)
			break
		}
	}
	b, err := json.Marshal(e)
	if err != nil {
		resp.Msg = "Error! Cannot delete env"
		return
	}
	err = os.WriteFile(a.env, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot delete env"
		return
	}
	resp.Success = true
	resp.Msg = "Env deleted successfully"
	resp.Data = e
	return
}
func (a *App) AddVar(id, key, value string) (resp JSResp) {
	if id == "" || key == "" || value == "" {
		resp.Msg = "Error! Cannot add variable"
		return
	}
	f, err := os.ReadFile(a.env)
	if err != nil {
		resp.Msg = "Error! Cannot add variable"
		return
	}
	var e []Env
	err = json.Unmarshal(f, &e)
	if err != nil {
		resp.Msg = "Error! Cannot add variable"
		return
	}
	for i := range e {
		if e[i].ID == id {
			if e[i].Variable == nil {
				e[i].Variable = make(map[string]string)
			}
			e[i].Variable[key] = value
			break
		}
	}
	b, err := json.Marshal(e)
	if err != nil {
		resp.Msg = "Error! Cannot add variable"
		return
	}
	err = os.WriteFile(a.env, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot add variable"
		return
	}
	resp.Success = true
	resp.Msg = "Variable added successfully"
	resp.Data = e
	return
}
func (a *App) DeleteVar(id, key string) (resp JSResp) {
	if id == "" || key == "" {
		resp.Msg = "Error! Cannot delete variable"
		return
	}
	f, err := os.ReadFile(a.env)
	if err != nil {
		resp.Msg = "Error! Cannot delete variable"
		return
	}
	var e []Env
	err = json.Unmarshal(f, &e)
	if err != nil {
		resp.Msg = "Error! Cannot delete variable"
		return
	}
	for i := range e {
		if e[i].ID == id {
			delete(e[i].Variable, key)
			break
		}
	}
	b, err := json.Marshal(e)
	if err != nil {
		resp.Msg = "Error! Cannot delete variable"
		return
	}
	err = os.WriteFile(a.env, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot delete variable"
		return
	}
	resp.Success = true
	resp.Msg = "Variable deleted successfully"
	resp.Data = e
	return
}
