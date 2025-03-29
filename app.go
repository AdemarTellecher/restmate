package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"
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

func (a *App) InvokeRequest(r Request) (resp JSResp) {
	if r.Url == "" {
		resp.Msg = "Error! URL cannot be empty"
		return
	}
	hasCol := false
	if r.CollId != "" {
		hasCol = true
	}
	vars := map[string]string{
		"my_var":    "hello",
		"user.name": "john",
		"user-id":   "1234",
	}
	u, err := url.Parse(r.Url)
	if err != nil {
		resp.Msg = "Error! cannot parse URL"
		return
	}
	var body io.Reader
	autoHeaders := make(http.Header)
	p := u.Query()
	for i := range r.Params {
		if strings.TrimSpace(r.Params[i].Key) != "" {
			p.Add(r.Params[i].Key, r.Params[i].Value)
		}
	}
	u.RawQuery = p.Encode()
	method := parseMethod(r.Method)
	if method != "GET" && method != "DELETE" {
		if r.Body.BodyType == "formdata" {
			var b bytes.Buffer
			writer := multipart.NewWriter(&b)
			for i := range r.Body.FormData {
				fd := r.Body.FormData[i]
				if fd.Type != "file" && fd.Key != "" {
					err := writer.WriteField(fd.Key, fd.Value)
					if err != nil {
						resp.Msg = "Error! Failed to write field formdata"
						return
					}
				}
				if fd.Type == "file" && fd.Key != "" {
					for f := range fd.Files {
						file, err := os.Open(fd.Files[f])
						if err != nil {
							resp.Msg = "Error! Cannot open file"
							return
						}
						defer file.Close()
						part, err := writer.CreateFormFile(fd.Key, filepath.Base(fd.Files[f]))
						if err != nil {
							resp.Msg = "Error! Failed to write image in formdata"
							return
						}
						if _, err := io.Copy(part, file); err != nil {
							resp.Msg = "Error! Failed to copy file content"
							return
						}
					}
				}
			}
			writer.Close()
			body = &b
			autoHeaders.Set("Content-Type", writer.FormDataContentType())
		} else {
			if hasCol {
				fmt.Println("post -> ", r.Body.BodyRaw)
				re := regexp.MustCompile(`\{\{([\w.-]+)\}\}`)
				output := re.ReplaceAllStringFunc(r.Body.BodyRaw, func(match string) string {
					// extract variable name from match
					key := re.FindStringSubmatch(match)[1]
					if val, ok := vars[key]; ok {
						return val
					}
					// return original if not found in map
					return match
				})
				fmt.Println("out -> ", output)
        //replace with output later 
				body = strings.NewReader(r.Body.BodyRaw)
			} else {
				body = strings.NewReader(r.Body.BodyRaw)
			}
			autoHeaders.Set("Content-Type", "application/json")
		}
	} else {
		body = nil
	}
	req, err := http.NewRequest(method, u.String(), body)
	if err != nil {
		resp.Msg = "Error! Request initiation failed"
		return
	}
	req.Header.Set("User-Agent", "restmate/0.0.9")
	req.Header.Set("Accept", "*/*")
	req.Header.Set("Connection", "close")
	for i := range r.Headers {
		if strings.TrimSpace(r.Headers[i].Key) != "" {
			req.Header.Set(r.Headers[i].Key, r.Headers[i].Value)
		}
	}
	for k, values := range autoHeaders {
		for _, v := range values {
			req.Header.Add(k, v)
		}
	}

	cli := http.Client{}
	startTime := time.Now()
	response, err := cli.Do(req)
	d := time.Since(startTime).Milliseconds()
	if err != nil {
		resp.Msg = "Error! Request action failed"
		return
	}
	defer response.Body.Close()
	duration := fmt.Sprintf("%d", d)
	var result Result
	result.StatusCode = response.StatusCode
	result.HttpStatus = response.Status
	result.Headers = parseResponseHeaders(&response.Header)
	result.Duration = duration

	buf, err := io.ReadAll(response.Body)
	if err != nil {
		resp.Msg = "Error! failed to read response body"
		return
	}
	ct := strings.ToLower(strings.Split(response.Header.Get("Content-Type"), ";")[0])
	switch {
	case strings.Contains(ct, "application/json"):
		result.BodyContent = string(buf)
		result.ContentType = "JSON"
	case strings.Contains(ct, "text/html"):
		result.BodyContent = string(buf)
		result.ContentType = "HTML"
	case strings.Contains(ct, "text/plain"):
		result.BodyContent = string(buf)
		result.ContentType = "TEXT"
	case strings.HasPrefix(ct, "image/"):
		result.BodyContent = "data:" + ct + ";base64," + base64.StdEncoding.EncodeToString(buf)
		result.ContentType = "IMAGE"
	case strings.Contains(ct, "application/pdf"):
		result.BodyContent = "data:" + ct + ";base64," + base64.StdEncoding.EncodeToString(buf)
		result.ContentType = "PDF"
	default:
		result.BodyContent = string(buf)
		result.ContentType = "TEXT"
	}
	resp.Success = true
	resp.Msg = "Request was successful"
	resp.Data = result
	return
}

func (a *App) ChoseFile() (resp JSResp) {
	s, err := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Choose files",
	})
	if err != nil || len(s) <= 0 {
		resp.Msg = "Error! Cannot Chose file"
		return
	}
	resp.Success = true
	resp.Msg = "Files selected successfully!"
	resp.Data = s
	return
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
		Variable: []KV{},
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
			Variable: (*c)[i].Variable,
		})
	}
	return collRspSlice
}
func parseMethod(m string) string {
	if m == "get" {
		return "GET"
	} else if m == "post" {
		return "POST"
	} else if m == "put" {
		return "PUT"
	} else if m == "delete" {
		return "DELETE"
	}
	return "GET"
}
func parseResponseHeaders(data *http.Header) []KV {
	var result []KV
	for k, v := range *data {
		h := KV{}
		h.Key = k
		h.Value = strings.Join(v, "")
		result = append(result, h)
	}
	return result
}
