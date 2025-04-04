import { GetSettings, SetSettings } from "../../wailsjs/go/main/App";

export const createAppSlice = (set) => ({
  appLoading: false,
  sideBarType: null,
  setSideBar: (s) => {
    set((x) => {
      if (x.sideBarType === s) {
        x.sideBarType = null;
      } else {
        x.sideBarType = s;
      }
    });
  },
  settings: {
    theme: "",
  },
  getSettings: async () => {
    set({ appLoading: true });
    let rsp = await GetSettings();
    if (!rsp.success) {
      set({ appLoading: false });
      return;
    }
    set((x) => {
      if (x.settings?.theme !== rsp.data.theme) {
        document.documentElement.setAttribute("data-theme", rsp.data.theme);
      }
      x.settings = rsp.data;
      x.appLoading = false;
    });
  },
  setSettings: async (k, v) => {
    let rsp = await SetSettings(k, v);
    if (!rsp.success) {
      return;
    }
    set((x) => {
      if (x.settings?.theme !== rsp.data.theme) {
        document.documentElement.setAttribute("data-theme", rsp.data.theme);
      }
      x.settings = rsp.data;
    });
  },
});
