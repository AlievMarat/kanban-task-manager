import React from "react";
import "./createFirstColumn.css";
import { openModal } from "../../../../store/slices/ModalOpen";
import { useDispatch } from "react-redux";
import EditBoard from "../../../Modal/EditBoard/EditBoard";
import { useTypedSelector } from "../../../../customHooks/useTypedSelector";
export default function CreateFirstColumn() {
  const dispatch = useDispatch();
  const modalFlag = useTypedSelector(
    (state) => state.modalOpen.modalFlags.editBoard
  );
  return (
    <>
      {modalFlag && <EditBoard />}
      <div className="first-column-create">
        This board is empty. Create a new column to get started.
        <button
          className="first-column-create__btn"
          onClick={() => dispatch(openModal("editBoard"))}
        >
          + Add New Column
        </button>
      </div>
    </>
  );
}
