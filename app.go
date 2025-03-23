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
