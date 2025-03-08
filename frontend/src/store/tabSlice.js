import { nanoid } from "nanoid";

class KeySchema {
  constructor(data = {}) {
    const defaults = {
      id: nanoid(),
      key: "",
      value: "",
      active: true,
    };
    Object.assign(this, defaults, data);
  }
}
class FDSchema {
  constructor(data = {}) {
    const defaults = {
      id: nanoid(),
      key: "",
      value: "",
      type: "text",
      active: true,
    };
    Object.assign(this, defaults, data);
  }
}
export class TabSchema {
  constructor(data = {}) {
    const defaults = {
      id: nanoid(),
      name: "Untitled",
      url: "",
      method: "get",
      headers: [new KeySchema()],
      params: [new KeySchema()],
      bodyType: "json",
      bodyRaw: "",
      formData: [new FDSchema()],
      coll_id: null,
      response: null,
    };
    Object.assign(this, defaults, data);
  }
}

export const createTabsSlice = (set) => ({
  tabs: [
    new TabSchema({
      response: {
        statusCode: 200,
        bodyContent: '{\n    "qwe": "testing response. This is the long response to check the line wrap of monaco editor in golang","success": true\n}',
        contentType: "JSON",
        duration: "323ms",
        httpStatus: "200 OK",
        headers: [new KeySchema({ key: "Authorization", value: "this value" }), new KeySchema({ key: "Content-Type", value: "this value2" })],
      },
      headers: [
        new KeySchema({ key: "Authorization", value: "this value" }),
        new KeySchema({ key: "Content-Type", value: "this value2" }),
        new KeySchema({ key: "this secone", value: "this value2", active: false }),
      ],
      params: [
        new KeySchema({ key: "this key", value: "this value" }),
        new KeySchema({ key: "this secone", value: "this value2", active: false }),
        new KeySchema({ key: "this secone", value: "this value2", active: false }),
      ],
    }),
    new TabSchema({ method: "put" }),
  ],
  tabInx: 0,
  setTabInx: (i) => set(() => ({ tabInx: i })),

  createTab: () => set((x) => ({ tabs: [...x.tabs, new TabSchema()], tabInx: x.tabs.length })),

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
    set((x) => ({
      tabs: x.tabs.map((tab) => (tab.id === id ? { ...tab, [key]: value } : tab)),
    })),

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
      return { tabs: x.tabs.map((t) => (t.id === id ? { ...t, headers: t.headers.map((p) => (p.id === pId ? { ...p, [key]: value } : p)) } : t)) };
    }),

  deleteHeaders: (id, pId) =>
    set((x) => {
      let p = x.tabs.find((t) => t.id === id);
      let len = p && p.headers.length;
      if (len > 1) {
        return { tabs: x.tabs.map((t) => (t.id === id ? { ...t, headers: t.headers.filter((p) => p.id !== pId) } : t)) };
      } else {
        return { tabs: x.tabs.map((t) => (t.id === id ? { ...t, headers: [new KeySchema()] } : t)) };
      }
    }),

  addHeaders: (id) =>
    set((x) => ({
      tabs: x.tabs.map((t) => (t.id === id ? { ...t, headers: [...t.headers, new KeySchema()] } : t)),
    })),

  updateParams: (id, pId, key, value) =>
    set((x) => {
      return { tabs: x.tabs.map((t) => (t.id === id ? { ...t, params: t.params.map((p) => (p.id === pId ? { ...p, [key]: value } : p)) } : t)) };
    }),

  deleteParam: (id, pId) =>
    set((x) => {
      let p = x.tabs.find((t) => t.id === id);
      let len = p && p.params.length;
      if (len > 1) {
        return { tabs: x.tabs.map((t) => (t.id === id ? { ...t, params: t.params.filter((p) => p.id !== pId) } : t)) };
      } else {
        return { tabs: x.tabs.map((t) => (t.id === id ? { ...t, params: [new KeySchema()] } : t)) };
      }
    }),

  addParam: (id) =>
    set((x) => ({
      tabs: x.tabs.map((t) => (t.id === id ? { ...t, params: [...t.params, new KeySchema()] } : t)),
    })),

  updateFormData: (id, pId, key, value) =>
    set((x) => {
      console.log(id, pId, key, value);
      return { tabs: x.tabs.map((t) => (t.id === id ? { ...t, formData: t.formData.map((p) => (p.id === pId ? { ...p, [key]: value } : p)) } : t)) };
    }),
  deleteFormData: (id, pId) =>
    set((x) => {
      let p = x.tabs.find((t) => t.id === id);
      let len = p && p.formData.length;
      if (len > 1) {
        return { tabs: x.tabs.map((t) => (t.id === id ? { ...t, formData: t.formData.filter((p) => p.id !== pId) } : t)) };
      } else {
        return { tabs: x.tabs.map((t) => (t.id === id ? { ...t, formData: [new FDSchema()] } : t)) };
      }
    }),
  addFormData: (id) =>
    set((x) => ({
      tabs: x.tabs.map((t) => (t.id === id ? { ...t, formData: [...t.formData, new FDSchema()] } : t)),
    })),
});
