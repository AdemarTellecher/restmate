import { AddCollection, GetCollections } from "../../wailsjs/go/main/App";
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
  saveReq: async (id, name, coll_id) => {
    //get tab by id and edit col_id and call backed with req
    //delete tab when collection is deleted
    let tab = get().tabs.find((tab) => tab.id === id);
    tab.name = "new name";
    if (!tab) return;
    console.log(tab);
    set((x) => ({
      tabs: x.tabs.map((tab) => (tab.id === id ? { ...tab, name, coll_id } : tab)),
    }));
  },
});
