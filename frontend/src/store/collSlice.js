import { AddCollection, GetCollections } from "../../wailsjs/go/main/App";
import { TabSchema } from "./tabSlice";

export const collections = [
  {
    id: "col-d33df",
    name: "Hobby project rest",
    requests: [
      new TabSchema({ name: "Signup Api", method: "post", coll_id: "col-d33df" }),
      new TabSchema({ name: "Login Api", method: "get", coll_id: "col-d33df" }),
      new TabSchema({ name: "Delete user", method: "delete", coll_id: "col-d33df" }),
      new TabSchema({ name: "Change user setting", method: "put", coll_id: "col-d33df" }),
    ],
  },
  {
    id: "col-123df",
    name: "My Awsome Collection",
    requests: [
      new TabSchema({ name: "Signup Api", method: "post", coll_id: "col-123df" }),
      new TabSchema({ name: "Login Api", method: "get", coll_id: "col-123df" }),
      new TabSchema({ name: "Delete user", method: "delete", coll_id: "col-123df" }),
    ],
  },
  {
    id: "col-1c3df",
    name: "My Awsome Collection which has a very long fuckin name",
    requests: [
      new TabSchema({ name: "Signup Api with super duper long name what you gonna do. ", method: "post", coll_id: "col-123df" }),
      new TabSchema({ name: "Login Api", method: "get", coll_id: "col-123df" }),
      new TabSchema({ name: "Delete user", method: "delete", coll_id: "col-123df" }),
    ],
  },
];
export const createColSlice = (set, get) => ({
  collections: [],
  cLoading: false,
  getCollections: async () => {
    set({ loading: true });
    let rsp = await GetCollections();
    if (!rsp.success) {
      set({ loading: false });
      return;
    }
    set({ loading: false, collections: rsp.data });
  },
  addCols: async (c) => {
    set({ loading: true });
    let rsp = await AddCollection(c.id, c.name);
    if (!rsp.success) {
      set({ loading: false });
      return;
    }
    set({ loading: false, collections: rsp.data });
  },
  saveReq: async (id) => {
    //get tab by id and edit col_id and call backed with req
    //delete tab when collection is deleted
    let tab = get().tabs.find((tab) => tab.id === id);
    if (!tab) return;
    console.log(tab);
  },
});
