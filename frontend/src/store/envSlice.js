import { AddEnv, AddVar, DeleteEnv, DeleteVar, DuplicateEnv, GetEnvs, RenameEnv, SelectEnv } from "../../wailsjs/go/main/App";

export const createEnvSlice = (set) => ({
  envs: [],
  envLoading: false,
  setSelectedEnv: async (id) => {
    set({ envLoading: true });
    let rsp = await SelectEnv(id);
    if (!rsp.success) {
      set({ envLoading: false });
      return false;
    }
    set({ envLoading: false, envs: rsp.data });
    return true;
  },
  renameEnv: async (id, name) => {
    set({ envLoading: true });
    let rsp = await RenameEnv(id, name);
    if (!rsp.success) {
      set({ envLoading: false });
      return false;
    }
    set({ envLoading: false, envs: rsp.data });
    return true;
  },
  addEnv: async (name) => {
    set({ envLoading: true });
    let rsp = await AddEnv(name);
    if (!rsp.success) {
      set({ envLoading: false });
      return false;
    }
    set({ envLoading: false, envs: rsp.data });
    return true;
  },
  duplicateEnv: async (id) => {
    set({ envLoading: true });
    let rsp = await DuplicateEnv(id);
    if (!rsp.success) {
      set({ envLoading: false });
      return false;
    }
    set({ envLoading: false, envs: rsp.data });
    return true;
  },
  deleteEnv: async (id) => {
    set({ envLoading: true });
    let rsp = await DeleteEnv(id);
    if (!rsp.success) {
      set({ envLoading: false });
      return false;
    }
    set({ envLoading: false, envs: rsp.data });
    return true;
  },
  getEnvs: async () => {
    set({ envLoading: true });
    let rsp = await GetEnvs();
    if (!rsp.success) {
      set({ envLoading: false });
      return;
    }
    set({ envLoading: false, envs: rsp.data });
  },
  addNewVar: async (id, k, v) => {
    set({ envLoading: true });
    let rsp = await AddVar(id, k, v);
    if (!rsp.success) {
      set({ envLoading: false });
      return false;
    }
    set({ envs: rsp.data, envLoading: false });
    return true;
  },
  deleteVar: async (id, name) => {
    set({ envLoading: true });
    let rsp = await DeleteVar(id, name);
    if (!rsp.success) {
      set({ envLoading: false });
      return false;
    }
    set({ envs: rsp.data, envLoading: false });
    return true;
  },
});
