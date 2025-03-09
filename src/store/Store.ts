import { configureStore } from "@reduxjs/toolkit";
import sidebarBoard from "./slices/SidebarBoardSlice";
import sidebarShow from "./slices/SidebarShowSlice";
import modalSlice from "./slices/ModalSlice";
export const store = configureStore({
  reducer: {
    sidebarBoard: sidebarBoard,
    sidebarShow: sidebarShow,
    modalSlice: modalSlice,
  },
});

// Infer types for dispatch & state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
