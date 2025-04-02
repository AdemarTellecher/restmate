export const createAppSlice = (set) => ({
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
});
