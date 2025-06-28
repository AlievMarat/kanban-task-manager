import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../types/IBoardData";
const initialState: ICard = {
  id: 0,
  title: "",
  color: "",
  description: "",
  custom: {
    deadline: "",
  },
  users: [],
};
const cardModalInfo = createSlice({
  name: "cardModalInfo",
  initialState,
  reducers: {
    setCardModalInfo(state, action) {
      return action.payload;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
  },
});
export const { setCardModalInfo, setTitle, setDescription } =
  cardModalInfo.actions;
export default cardModalInfo.reducer;
