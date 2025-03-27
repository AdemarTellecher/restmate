package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/goccy/go-json"
	"github.com/wailsapp/wails/v2/pkg/runtime"
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

func (a *App) ExportCollection(id string) (resp JSResp) {
	if id == "" {
		resp.Msg = "Error! Cannot Export collection"
		return
	}
	m, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           "Save Collection",
		DefaultFilename: "Restmate_collection.json",
	})
	if err != nil {
		resp.Msg = "Error! Cannot Export collection"
		return
	}
	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot Export collection"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot Export collection"
		return
	}
	for i := range c {
		if c[i].ID == id {
			b, err := json.Marshal(c[i])
			if err != nil {
				resp.Msg = "Error! Cannot Export collection"
				return
			}
			err = os.WriteFile(m, b, 0644)
			if err != nil {
				resp.Msg = "Error! Cannot Export collection"
				return
			}
			resp.Success = true
			resp.Msg = "Collection exported successfully!"
			return
		}
	}
	resp.Msg = "Error! Cannot Export collection"
	return
}
func (a *App) MoveRequest(id, coll_id, new_coll_id string) (resp JSResp) {
	// time.Sleep(time.Second * 3)
	if id == "" || coll_id == "" || new_coll_id == "" {
		resp.Msg = "Error! Cannot move request"
		return
	}
	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot move request"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot move request"
		return
	}
	var mReq Request
	for i := range c {
		if c[i].ID == coll_id {
			for j := range c[i].Requests {
				if c[i].Requests[j].ID == id {
					mReq = c[i].Requests[j]
					c[i].Requests = append(c[i].Requests[:j], c[i].Requests[j+1:]...)
					break
				}
			}
		}
	}
	if mReq.ID == "" {
		resp.Msg = "Error! Request not found"
		return
	}
	opr := false
	for i := range c {
		if c[i].ID == new_coll_id {
			mReq.CollId = new_coll_id
			c[i].Requests = append(c[i].Requests, mReq)
			opr = true
			break
		}
	}
	if !opr {
		resp.Msg = "Error! Target collection not found"
		return
	}
	b, err := json.Marshal(c)
	if err != nil {
		resp.Msg = "Error! Cannot move request"
		return
	}
	err = os.WriteFile(a.db, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot move request"
		return
	}
	collRspSlice := makeCollRsp(&c)
	resp.Success = true
	resp.Msg = "request moved successfully"
	resp.Data = collRspSlice
	return
}

func (a *App) GetRequest(id, coll_id string) (resp JSResp) {
	// time.Sleep(time.Second * 3)
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
	collRspSlice := makeCollRsp(&c)
	resp.Success = true
	resp.Msg = "request saved successfully"
	resp.Data = collRspSlice
	return
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
	collRspSlice := makeCollRsp(&c)
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
	collRspSlice := makeCollRsp(&c)
	resp.Success = true
	resp.Msg = "Collection saved successfully"
	resp.Data = collRspSlice
	return
}
func (a *App) RenameCollection(id, name string) (resp JSResp) {
	if id == "" || name == "" {
		resp.Msg = "Error! Cannot rename collection"
		return
	}
	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot rename collection"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot rename collection"
		return
	}
	for i := range c {
		if c[i].ID == id {
			c[i].Name = name
			break
		}
	}
	b, err := json.Marshal(c)
	if err != nil {
		resp.Msg = "Error! Cannot rename collection"
		return
	}
	err = os.WriteFile(a.db, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot rename collection"
		return
	}
	collRspSlice := makeCollRsp(&c)
	resp.Success = true
	resp.Msg = "Collection renamed successfully"
	resp.Data = collRspSlice
	return
}
func (a *App) RenameRequest(coll_id, req_id, req_name string) (resp JSResp) {
	if coll_id == "" || req_id == "" || req_name == "" {
		resp.Msg = "Error! Cannot rename request"
		return
	}
	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot rename request"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot rename request"
		return
	}
	for i := range c {
		if c[i].ID == coll_id {
			for j := range c[i].Requests {
				if c[i].Requests[j].ID == req_id {
					c[i].Requests[j].Name = req_name
					break
				}
			}
			break
		}
	}
	b, err := json.Marshal(c)
	if err != nil {
		resp.Msg = "Error! Cannot rename request"
		return
	}
	err = os.WriteFile(a.db, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot rename request"
		return
	}
	collRspSlice := makeCollRsp(&c)
	resp.Success = true
	resp.Msg = "Request renamed successfully"
	resp.Data = collRspSlice
	return
}
func (a *App) DeleteRequest(coll_id, req_id string) (resp JSResp) {
	if coll_id == "" || req_id == "" {
		resp.Msg = "Error! Cannot delete request"
		return
	}
	str, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:          runtime.QuestionDialog,
		Title:         "Delete Request",
		Message:       "Are you sure you want to delete the Request? The Request will be deleted permanently.",
		Buttons:       []string{"Yes", "No"},
		DefaultButton: "No",
	})
	if err != nil {
		resp.Msg = "Error! Cannot delete request"
		return
	}
	if str != "Yes" && str != "Ok" {
		resp.Msg = "Error! Cannot delete request"
		return
	}

	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot delete request"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot delete request"
		return
	}
	for i := range c {
		if c[i].ID == coll_id {
			for j := range c[i].Requests {
				if c[i].Requests[j].ID == req_id {
					c[i].Requests = append(c[i].Requests[:j], c[i].Requests[j+1:]...)
					break
				}
			}
			break
		}
	}
	b, err := json.Marshal(c)
	if err != nil {
		resp.Msg = "Error! Cannot delete request"
		return
	}
	err = os.WriteFile(a.db, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot delete request"
		return
	}
	collRspSlice := makeCollRsp(&c)
	resp.Success = true
	resp.Msg = "Request deleted successfully"
	resp.Data = collRspSlice
	return
}

func (a *App) DeleteCollection(id string) (resp JSResp) {
	if id == "" {
		resp.Msg = "Error! Cannot delete request"
		return
	}
	str, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:          runtime.QuestionDialog,
		Title:         "Delete Collection",
		Message:       "Are you sure you want to delete the Collection? All Requests in this collection will be deleted permanently.",
		Buttons:       []string{"Yes", "No"},
		DefaultButton: "No",
	})
	if err != nil {
		resp.Msg = "Error! Cannot delete request"
		return
	}
	if str != "Yes" && str != "Ok" {
		resp.Msg = "Error! Cannot delete request"
		return
	}
	f, err := os.ReadFile(a.db)
	if err != nil {
		resp.Msg = "Error! Cannot delete collection"
		return
	}
	var c []Collection
	err = json.Unmarshal(f, &c)
	if err != nil {
		resp.Msg = "Error! Cannot delete collection"
		return
	}
	for i := range c {
		if c[i].ID == id {
			c = append(c[:i], c[i+1:]...)
			break
		}
	}
	b, err := json.Marshal(c)
	if err != nil {
		resp.Msg = "Error! Cannot delete collection"
		return
	}
	err = os.WriteFile(a.db, b, 0644)
	if err != nil {
		resp.Msg = "Error! Cannot delete collection"
		return
	}
	collRspSlice := makeCollRsp(&c)
	resp.Success = true
	resp.Msg = "Collection deleted successfully"
	resp.Data = collRspSlice
	return
}

func makeCollRsp(c *[]Collection) []CollRsp {
	collRspSlice := make([]CollRsp, 0, len(*c))
	for i := range *c {
		reqRspSlice := make([]ReqRsp, 0, len((*c)[i].Requests))
		for j := range (*c)[i].Requests {
			r := (*c)[i].Requests[j]
			reqRspSlice = append(reqRspSlice, ReqRsp{
				ID:     r.ID,
				Name:   r.Name,
				Url:    r.Url,
				Method: r.Method,
				CollId: r.CollId,
			})
		}

		collRspSlice = append(collRspSlice, CollRsp{
			ID:       (*c)[i].ID,
			Name:     (*c)[i].Name,
			Requests: reqRspSlice,
		})
	}
	return collRspSlice
}
