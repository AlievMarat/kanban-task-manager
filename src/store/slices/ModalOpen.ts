import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
type ModalKey =
  | "addNewBoard"
  | "editBoard"
  | "deleteBoard"
  | "deleteTask"
  | "addNewTask";
const openModalSlice = createSlice({
  name: "openModal",
  initialState: {
    modalFlags: {
      addNewBoard: false,
      editBoard: false,
      deleteBoard: false,
      deleteTask: false,
      addNewTask: false,
    },
  },
  reducers: {
    openModal: (state, action: PayloadAction<ModalKey>) => {
      state.modalFlags[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<ModalKey>) => {
      state.modalFlags[action.payload] = false;
    },
  },
});
export const { openModal, closeModal } = openModalSlice.actions;
export default openModalSlice.reducer;
