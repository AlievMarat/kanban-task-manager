import { configureStore } from "@reduxjs/toolkit";
import addNewBoard from "./slices/SidebarBoardSlice";
import sidebarBoard from "./slices/SidebarBoardSlice";
import ModalOpenSlice from "./slices/ModalOpen";
import EditBoardSlice from "./slices/EditBoardSlice";
import createBoardSlice from "./slices/CreateBoard";
import sidebarShow from "./slices/SidebarShowSlice";
import createTask from "./slices/CreateTask";
import CardModalInfo from "./slices/cardModalInfo";
import columnId from "./slices/columnId";
import themeSlice from "./slices/setDarkTheme";
export const store = configureStore({
  reducer: {
    sidebarBoard: sidebarBoard,
    sidebarShow: sidebarShow,
    addNewBoard: addNewBoard,
    modalOpen: ModalOpenSlice,
    editBoard: EditBoardSlice,
    createBoard: createBoardSlice,
    createTask: createTask,
    CardModal: CardModalInfo,
    columnId: columnId,
    themeSlice: themeSlice,
  },
});

// Infer types for dispatch & state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
