import { create } from "zustand";
import { createTabsSlice } from "./tabSlice";
import { devtools } from "zustand/middleware";


export const useStore = create()(
  devtools((...a) => ({
    ...createTabsSlice(...a),
  })),
);
