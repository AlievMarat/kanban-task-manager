import { configureStore } from "@reduxjs/toolkit";
import addNewBoard from "./slices/SidebarBoardSlice";
import sidebarBoard from "./slices/SidebarBoardSlice";
import ModalOpenSlice from "./slices/ModalOpen";
import sidebarShow from "./slices/SidebarShowSlice";
import InputValuesSlice from "./slices/InputValuesSlice";
export const store = configureStore({
  reducer: {
    sidebarBoard: sidebarBoard,
    sidebarShow: sidebarShow,
    InputValuesSlice: InputValuesSlice,
    addNewBoard: addNewBoard,
    modalOpen: ModalOpenSlice,
  },
});

// Infer types for dispatch & state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
