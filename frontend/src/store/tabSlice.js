import { nanoid } from "nanoid";

function tabSchema(data = {}) {
  const defaults = {
    id: nanoid(),
    name: "Untitled",
    url: "",
    method: "get",
    headers: [{ id: nanoid(), key: "", value: "", active: true }],
    params: [{ id: nanoid(), key: "", value: "", active: true }],
    body: {
      bodyType: "json",
      bodyRaw: "",
      formData: [{ id: nanoid(), key: "", value: "", type: "text", active: true }],
    },
    coll_id: null,
    response: null,
  };
  return { ...defaults, ...data };
}
export const createTabsSlice = (set) => ({
  tabs: [tabSchema({ name: "new name func" })],
  tabInx: 0,
  setTabInx: (i) => set(() => ({ tabInx: i })),

  createTab: () => set((x) => ({ tabs: [...x.tabs, tabSchema({ name: "Untitled" })], tabInx: x.tabs.length })),

  openTab: (t) =>
    set((x) => {
      const eInx = x.tabs.findIndex((tab) => tab.id === t.id);
      if (eInx !== -1) {
        const updatedTabs = [...x.tabs];
        updatedTabs[eInx] = t;
        return { tabs: updatedTabs, tabInx: eInx };
      } else {
        return { tabs: [...x.tabs, t], tabInx: x.tabs.length };
      }
    }),

  updateTab: (id, key, value) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      t[key] = value;
    }),

  updateReqBody: (id, key, value) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      t.body[key] = value;
    }),

  deleteTab: (id) =>
    set((x) => {
      const tabIndex = x.tabs.findIndex((tab) => tab.id === id);
      const cf = x.tabInx;
      if (tabIndex === -1) return x;
      const newTabs = x.tabs.filter((tab) => tab.id !== id);
      let nf = cf;
      if (cf === tabIndex) {
        nf = tabIndex > 0 ? tabIndex - 1 : 0;
      } else if (cf > tabIndex) {
        nf = cf - 1;
      }
      nf = Math.min(nf, newTabs.length - 1);
      return {
        tabs: newTabs,
        tabInx: newTabs.length > 0 ? nf : -1,
      };
    }),

  updateHeaders: (id, pId, key, value) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      let h = t.headers.find((h) => h.id === pId);
      if (!h) return;
      h[key] = value;
    }),

  deleteHeaders: (id, pId) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      if (t.headers.length > 1) {
        t.headers = t.headers.filter((h) => h.id !== pId);
      } else {
        t.headers = [{ id: nanoid(), key: "", value: "", active: true }];
      }
    }),

  addHeaders: (id) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      t.headers.push({ id: nanoid(), key: "", value: "", active: true });
    }),

  updateParams: (id, pId, key, value) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      let h = t.params.find((h) => h.id === pId);
      if (!h) return;
      h[key] = value;
    }),

  deleteParam: (id, pId) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      if (t.params.length > 1) {
        t.params = t.params.filter((h) => h.id !== pId);
      } else {
        t.params = [{ id: nanoid(), key: "", value: "", active: true }];
      }
    }),

  addParam: (id) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      t.params.push({ id: nanoid(), key: "", value: "", active: true });
    }),

  updateFormData: (id, pId, key, value) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      let h = t.body.formData.find((h) => h.id === pId);
      if (!h) return;
      h[key] = value;
    }),
  deleteFormData: (id, pId) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      if (t.body?.formData.length > 1) {
        t.body.formData = t.body.formData.filter((h) => h.id !== pId);
      } else {
        t.body.formData = [{ id: nanoid(), key: "", value: "", type: "text", active: true }];
      }
    }),
  addFormData: (id) =>
    set((x) => {
      let t = x.tabs.find((t) => t.id === id);
      if (!t) return;
      t.body.formData.push({ id: nanoid(), key: "", value: "", type: "text", active: true });
    }),
});
