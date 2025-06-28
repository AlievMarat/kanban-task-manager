import { createSlice } from "@reduxjs/toolkit";
const createTask = createSlice({
  name: "task",
  initialState: {
    columnId: "",
    taskTitle: "",
    taskDescription: "",
  },
  reducers: {
    addTaskId: (state, action) => {
      state.columnId = action.payload;
    },
    addTaskTitle: (state, action) => {
      state.taskTitle = action.payload;
    },
    addTaskDescription: (state, action) => {
      state.taskDescription = action.payload;
    },
  },
});
export const { addTaskId, addTaskTitle, addTaskDescription } =
  createTask.actions;
export default createTask.reducer;
