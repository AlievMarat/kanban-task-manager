import { createSlice } from "@reduxjs/toolkit";
const modalSlice = createSlice({
  name: "modalOpen",
  initialState: { open: false },
  reducers: {
    isOpenModal(state, action) {
      state.open = action.payload;
    },
  },
});
export const { isOpenModal } = modalSlice.actions;
export default modalSlice.reducer;
