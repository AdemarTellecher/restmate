package main

import (
	"context"
	"fmt"
	"os"

	"github.com/goccy/go-json"
)

// App struct
type App struct {
	ctx context.Context
	db  string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) UpsertRequest(r Request) Rsp {
	opr := false
	if r.CollId == "" || r.ID == "" {
		return Rsp{Success: false, Msg: "Invalid request"}
	}
	f, err := os.ReadFile(a.db)
	if err != nil {
		return Rsp{Success: false, Msg: err.Error()}
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		return Rsp{Success: false, Msg: err.Error()}
	}
	for i := range c {
		if c[i].ID == r.CollId {
			fmt.Println("col found")
			found := false
			for j := range c[i].Requests {
				if c[i].Requests[j].ID == r.ID {
					c[i].Requests[j] = r
					found = true
					opr = true
					break
				}
			}
			if !found {
				fmt.Println("in no found", found)
				c[i].Requests = append(c[i].Requests, r)
				opr = true
			}
			break
		}
	}
	if !opr {
		return Rsp{Success: false, Msg: "Collection not found"}
	}
	b, err := json.Marshal(c)
	if err != nil {
		return Rsp{Success: false, Msg: err.Error()}
	}
	err = os.WriteFile(a.db, b, 0644)
	if err != nil {
		return Rsp{Success: false, Msg: err.Error()}
	}
	return Rsp{
		Success: true,
		Msg:     "Request added successfully",
	}
}
func (a *App) GetCollections() (resp JSResp) {
	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot add collection"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot add collection"
		return
	}
	var collRspSlice []CollRsp

	for i := range c {
		var reqRspSlice []ReqRsp
		for j := range c[i].Requests {
			reqRspSlice = append(reqRspSlice, ReqRsp{
				ID:     c[i].Requests[j].ID,
				Name:   c[i].Requests[j].Name,
				Url:    c[i].Requests[j].Url,
				Method: c[i].Requests[j].Method,
				CollId: c[i].Requests[j].CollId,
			})
		}

		collRspSlice = append(collRspSlice, CollRsp{
			ID:       c[i].ID,
			Name:     c[i].Name,
			Requests: reqRspSlice,
		})
	}
	resp.Success = true
	resp.Msg = "Collection saved successfully"
	resp.Data = collRspSlice
	return
}
func (a *App) AddCollection(id, name string) (resp JSResp) {
	if id == "" || name == "" {
		resp.Msg = "Error! Cannot add collection"
		return
	}
	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot add collection"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot add collection"
		return
	}
	newCol := Collection{
		ID:       id,
		Name:     name,
		Requests: []Request{},
	}
	c = append(c, newCol)
	b, err := json.Marshal(c)
	if err != nil {
		resp.Msg = "Error! Cannot add collection"
		return
	}
	err = os.WriteFile(a.db, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot add collection"
		return
	}
	var collRspSlice []CollRsp

	for i := range c {
		var reqRspSlice []ReqRsp
		for j := range c[i].Requests {
			reqRspSlice = append(reqRspSlice, ReqRsp{
				ID:     c[i].Requests[j].ID,
				Name:   c[i].Requests[j].Name,
				Url:    c[i].Requests[j].Url,
				Method: c[i].Requests[j].Method,
				CollId: c[i].Requests[j].CollId,
			})
		}

		collRspSlice = append(collRspSlice, CollRsp{
			ID:       c[i].ID,
			Name:     c[i].Name,
			Requests: reqRspSlice,
		})
	}
	resp.Success = true
	resp.Msg = "Collection saved successfully"
	resp.Data = collRspSlice
	return
}
