import { createSlice } from "@reduxjs/toolkit";
interface ISidebarBoard {
  title: string;
  custom: {
    description: string;
  };
}
const initialState: ISidebarBoard[] = [
  {
    title: "",
    custom: {
      description: "",
    },
  },
];

const sidebarBoardSlice = createSlice({
  name: "sidebarBoard",
  initialState,
  reducers: {
    sidebarBoardCreate(state, action) {
      state.push(action.payload);
    },
  },
});
export const { sidebarBoardCreate } = sidebarBoardSlice.actions;
export default sidebarBoardSlice.reducer;
