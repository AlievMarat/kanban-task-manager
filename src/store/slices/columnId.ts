import { createSlice } from "@reduxjs/toolkit";
const columnId = createSlice({
  name: "column",
  initialState: {
    columnId: 0,
  },
  reducers: {
    addColumnId: (state, action) => {
      state.columnId = action.payload;
    },
  },
});
export const { addColumnId } = columnId.actions;
export default columnId.reducer;
