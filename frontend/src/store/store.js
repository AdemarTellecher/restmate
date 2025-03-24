import { create } from "zustand";
import { createTabsSlice } from "./tabSlice";
import { devtools } from "zustand/middleware";
import { createColSlice } from "./collSlice";

export const useStore = create()(
  devtools((...a) => ({
    ...createTabsSlice(...a),
    ...createColSlice(...a),
  })),
);
