import { createSlice } from "@reduxjs/toolkit";
interface IInputValues {
  boardName: string;
  columns: [{ inputId: number; value: string }];
  editColumns: [{ inputId: number; value: string }];
}
const initialState: IInputValues = {
  boardName: "",
  columns: [{ inputId: 0, value: "" }],
  editColumns: [{ inputId: 0, value: "" }],
};
const InputValuesSlice = createSlice({
  name: "InputValues",
  initialState,
  reducers: {
    addInput: (state, action) => {
      const { inputId, value } = action.payload;
      state.columns.push({ inputId, value });
    },
    addColumnValue: (state, action) => {
      const { inputId, value } = action.payload;
      state.columns[action.payload.index] = { inputId, value };
    },
    addBoardNameValue: (state, action) => {
      state.boardName = action.payload.value;
    },
    clearInputValues: (state, action) => {
      const inputId = action.payload;
      state.columns.push({ inputId, value: "" });
    },
    deleteInputs: (state, action) => {
      state.columns.splice(action.payload, 1);
    },
    editColumn: (state, action) => {
      const { inputId, value } = action.payload;
      state.editColumns.push({ inputId, value: value });
    },
  },
});
export const {
  addColumnValue,
  addBoardNameValue,
  addInput,
  clearInputValues,
  deleteInputs,
  editColumn,
} = InputValuesSlice.actions;
export default InputValuesSlice.reducer;
