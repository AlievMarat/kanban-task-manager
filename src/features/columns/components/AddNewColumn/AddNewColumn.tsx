import React from "react";
import "../AddNewColumn/addNewColumn.css";
import { useTypedSelector } from "../../../../customHooks/useTypedSelector";
import { useDispatch } from "react-redux";
import EditBoard from "../../../Modal/EditBoard/EditBoard";
// import { addBoardNameValue } from "../../../../store/slices/InputValuesSlice";
import { openModal } from "../../../../store/slices/ModalOpen";
import GenericModal from "../../../Modal/CreateBoard/CreateBoard";
import { useRenameBoardMutation } from "../../../boards/useBoardQuery/useBoardQuery";
export default function AddNewColumn() {
  const modalFlag = useTypedSelector(
    (state) => state.modalOpen.modalFlags.editBoard
  );
  const dispatch = useDispatch();
  const renameBoardMutation = useRenameBoardMutation();
  return (
    <>
      {modalFlag && <EditBoard />}
      <button
        className="add-column"
        onClick={() => {
          dispatch(openModal("editBoard"));
        }}
      >
        + New Column
      </button>
    </>
  );
}
