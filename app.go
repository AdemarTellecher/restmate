package main

import (
	"context"
	"fmt"
	"os"
	"time"

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

func (a *App) GetRequest(id, coll_id string) (resp JSResp) {
	time.Sleep(time.Second * 3)
	if id == "" || coll_id == "" {
		resp.Msg = "Error! Cannot fetch request"
		return
	}
	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot fetch request"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot fetch request"
		return
	}
	for i := range c {
		if c[i].ID == coll_id {
			for j := range c[i].Requests {
				if c[i].Requests[j].ID == id {
					resp.Success = true
					resp.Msg = "Success! request found"
					resp.Data = c[i].Requests[j]
					return
				}
			}
		}
	}
	resp.Msg = "Error! Cannot fetch request"
	return
}
func (a *App) UpsertRequest(r Request) (resp JSResp) {
	time.Sleep(time.Second * 3)
	opr := false
	if r.CollId == "" || r.ID == "" {
		resp.Msg = "Error! Cannot save request"
		return
	}
	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot save request"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot save request"
		return
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
		resp.Msg = "Error! Cannot save request"
		return
	}
	b, err := json.Marshal(c)
	if err != nil {
		resp.Msg = "Error! Cannot save request"
		return
	}
	err = os.WriteFile(a.db, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot save request"
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
	resp.Msg = "request saved successfully"
	resp.Data = collRspSlice
	return
}
func (a *App) GetCollections() (resp JSResp) {
	time.Sleep(time.Second * 3)
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
	resp.Msg = "Collection fetched successfully"
	resp.Data = collRspSlice
	return
}
func (a *App) AddCollection(id, name string) (resp JSResp) {
	time.Sleep(time.Second * 3)
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
