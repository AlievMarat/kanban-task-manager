import { useTypedSelector } from "./useTypedSelector";
import { useEffect } from "react";
import { useBoardMutations } from "../features/boards/useBoardQuery/useBoardQuery";
import { useDispatch } from "react-redux";
import { resetBoardName } from "../store/slices/CreateBoard";
import { IBoardSidebarPost } from "../types/IBoardData";
import { resetColumns } from "../store/slices/EditBoardSlice";
export function useCreateBoardLogic() {
  const createBoardMutation = useBoardMutations();
  const boardName = useTypedSelector((state) => state.createBoard.title);
  const newColumns = useTypedSelector((state) => state.editBoard.newColumns);
  const dispatch = useDispatch();
  const handleCreateBoard = () => {
    const boardData: IBoardSidebarPost = {
      title: boardName,
      custom: { description: "dsf" },
    };
    createBoardMutation.mutate(boardData);
  };
  useEffect(() => {
    dispatch(resetColumns());
    dispatch(resetBoardName());
  }, []);
  return {
    createBoardMutation,
    newColumns,
    handleCreateBoard,
    boardName,
  };
}
