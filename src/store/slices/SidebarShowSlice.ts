import { createSlice } from "@reduxjs/toolkit";
const sidebarShow = createSlice({
  name: "sidebarShow",
  initialState: {
    show: false,
  },
  reducers: {
    sidebarShowAdd(state, action) {
      state.show = action.payload;
    },
  },
});
export const { sidebarShowAdd } = sidebarShow.actions;
export default sidebarShow.reducer;
 