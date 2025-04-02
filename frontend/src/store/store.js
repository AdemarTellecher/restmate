import { create } from "zustand";
import { createTabsSlice } from "./tabSlice";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createColSlice } from "./collSlice";
import { createAppSlice } from "./appSlice";

export const useStore = create()(
  devtools(
    immer((...a) => ({
      ...createTabsSlice(...a),
      ...createColSlice(...a),
      ...createAppSlice(...a),
    })),
  ),
);
