import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Theme = "light" | "dark";
const initialState = {
  theme: "light" as Theme,
};
const themeSlice = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});
export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
