import React from "react";
import { useTypedSelector } from "../../../../customHooks/useTypedSelector";
import { useBoardMutations } from "../../useBoardQuery/useBoardQuery";
import { IBoardSidebarPost } from "../../../../types/IBoardData";
import GenericModal from "../../../Modal/GenericModal/GenericModal";
export default function AddNewBoard() {
  const boardMutation = useBoardMutations();
  const { boardName } = useTypedSelector((state) => state.InputValuesSlice);
  const addNewBoardFlag = useTypedSelector(
    (state) => state.modalOpen.modalFlags.addNewBoard
  );
  const handleCreateBoard = () => {
    const boardData: IBoardSidebarPost = {
      title: boardName,
      custom: { description: "dsf" },
    };
    boardMutation.mutate(boardData);
  };
  return (
    <>
      {addNewBoardFlag && (
        <GenericModal
          genericTitle="Add New Board"
          genericButton="Create New Board"
          handleCreateBoard={handleCreateBoard}
        />
      )}
    </>
  );
}
