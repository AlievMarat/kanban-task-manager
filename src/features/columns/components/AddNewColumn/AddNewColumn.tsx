import React from "react";
import "../AddNewColumn/addNewColumn.css";
import { useTypedSelector } from "../../../../customHooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { addBoardNameValue } from "../../../../store/slices/InputValuesSlice";
import { openModal } from "../../../../store/slices/ModalOpen";
import GenericModal from "../../../Modal/GenericModal/GenericModal";
import { useRenameBoardMutation } from "../../../boards/useBoardQuery/useBoardQuery";
export default function AddNewColumn() {
  const { boardName, columns } = useTypedSelector(
    (state) => state.InputValuesSlice
  );
  const modalFlag = useTypedSelector(
    (state) => state.modalOpen.modalFlags.editBoard
  );
  const renameBoardMutation = useRenameBoardMutation();
  console.log(modalFlag);
  const dispatch = useDispatch();
  console.log(boardName);
  const handleRenameBoard = () => {
    const boardData: any = {
      title: boardName,
      custom: {
        description: "desc1",
        color: "green",
      },
    };

    renameBoardMutation.mutate(boardData);
  };
  return (
    <>
      {modalFlag && (
        <GenericModal
          genericTitle="Edit Board"
          genericButton="Save Changes"
          handleCreateBoard={handleRenameBoard}
        />
      )}
      <button
        className="add-column"
        onClick={() => {
          dispatch(addBoardNameValue("Edit Board"));
          dispatch(openModal("editBoard"));
        }}
      >
        + New Column
      </button>
    </>
  );
}
