import React from "react";
import GenericModalTask from "../../../Modal/GenericModalTask/GenericModalTask";
import { useTypedSelector } from "../../../../customHooks/useTypedSelector";
export default function AddNewTask() {
  const addNewTask = useTypedSelector(
    (state) => state.modalOpen.modalFlags.addNewTask
  );
  return (
    <>
      {addNewTask && (
        <GenericModalTask title="Add New Task" createTask={() => null} />
      )}
    </>
  );
}
