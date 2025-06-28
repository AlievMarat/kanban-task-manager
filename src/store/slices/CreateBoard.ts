import { createSlice } from "@reduxjs/toolkit";
const createBoardSlice = createSlice({
  name: "createBoard",
  initialState: {
    title: "",
  },
  reducers: {
    addBoardName: (state, action) => {
      state.title = action.payload;
    },
    resetBoardName: (state) => {
      state.title = "";
    },
  },
});
export const { addBoardName, resetBoardName } = createBoardSlice.actions;
export default createBoardSlice.reducer;
