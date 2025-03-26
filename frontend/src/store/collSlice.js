import { AddCollection, GetCollections, UpsertRequest } from "../../wailsjs/go/main/App";
export const createColSlice = (set, get) => ({
  collections: [],
  cLoading: false,
  getCollections: async () => {
    set({ cLoading: true });
    let rsp = await GetCollections();
    if (!rsp.success) {
      set({ cLoading: false });
      return;
    }
    set({ cLoading: false, collections: rsp.data });
  },
  addCols: async (c) => {
    set({ cLoading: true });
    let rsp = await AddCollection(c.id, c.name);
    if (!rsp.success) {
      set({ cLoading: false });
      return false;
    }
    set({ cLoading: false, collections: rsp.data });
    return true;
  },
  getColName: (id) => {
    let c = get().collections.find((c) => c.id === id);
    if (!c) return false;
    return c.name;
  },
  updateReq: async (id) => {
    set({ cLoading: true });
    let tab = get().tabs.find((t) => t.id === id);
    let t = structuredClone(tab);
    delete t.response;
    let rsp = await UpsertRequest(t);
    console.log(rsp)
    if (!rsp.success) {
      set({ cLoading: false });
      return false;
    }
    set({ collections: rsp.data, cLoading: false });
    return true;
  },
  saveReq: async (id, name, coll_id) => {
    //get tab by id and edit col_id and call backed with req
    //delete tab when collection is deleted
    set({ cLoading: true });
    let tab = get().tabs.find((t) => t.id === id);
    let t = structuredClone(tab);
    delete t.response;
    t.name = name;
    t.coll_id = coll_id;
    console.log(t);
    let rsp = await UpsertRequest(t);
    if (!rsp.success) {
      set({ cLoading: false });
      return false;
    }
    set({ collections: rsp.data });
    set((x) => {
      let tab = x.tabs.find((t) => t.id === id);
      tab.name = name;
      tab.coll_id = coll_id;
      x.cLoading = false;
    });
    return true;
  },
});
