import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Column = {
  id: string;
  value: string;
};

type NewColumn = {
  value: string;
};

interface EditBoardState {
  allColumns: Column[];
  newColumns: NewColumn[];
  deleteColumns: string[];
}

const initialState: EditBoardState = {
  allColumns: [],
  newColumns: [],
  deleteColumns: [],
};

const EditBoardSlice = createSlice({
  name: "editBoard",
  initialState,
  reducers: {
    addAllColumns: (
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      const { id, value } = action.payload;
      state.allColumns.push({ id, value });
    },
    addNewColumns: (state) => {
      state.newColumns.push({ value: "" });
    },
    resetColumns: (state) => {
      state.allColumns = [];
      state.newColumns = [];
      state.deleteColumns = [];
    },
    newColumnValue: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      const { index, value } = action.payload;
      if (state.newColumns[index]) {
        state.newColumns[index].value = value;
      }
    },
    deleteForNewColumns: (state, action: PayloadAction<{ index: number }>) => {
      state.newColumns.splice(action.payload.index, 1);
    },
    deleteForAllColumns: (
      state,
      action: PayloadAction<{ index: number; id: string }>
    ) => {
      const { index, id } = action.payload;
      state.deleteColumns.push(id);
      state.allColumns.splice(index, 1);
    },
  },
});

export const {
  addAllColumns,
  addNewColumns,
  newColumnValue,
  deleteForNewColumns,
  resetColumns,
  deleteForAllColumns,
} = EditBoardSlice.actions;

export default EditBoardSlice.reducer;
