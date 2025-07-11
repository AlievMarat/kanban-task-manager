import { useEffect } from "react";
import { useTypedSelector } from "../customHooks/useTypedSelector";
import {
  useBoardInfoQuery,
  useBoardMutations,
  useRenameBoardMutation,
} from "../features/boards/useBoardQuery/useBoardQuery";
import { addAllColumns, resetColumns } from "../store/slices/EditBoardSlice";
import { addBoardName } from "../store/slices/CreateBoard";
import { useDispatch } from "react-redux";
import { IBoardSidebarPost } from "../types/IBoardData";
import { closeModal } from "../store/slices/ModalOpen";
export function useEditBoardLogic() {
  const newColumns = useTypedSelector((state) => state.editBoard.newColumns);
  const boardName = useTypedSelector((state) => state.createBoard.title);
  const allColumns = useTypedSelector((state) => state.editBoard.allColumns);
  const { data } = useBoardInfoQuery();
  const dispatch = useDispatch();
  const boardMutation = useBoardMutations();
  const renameBoardMutation = useRenameBoardMutation();
  console.log(boardName);
  useEffect(() => {
    dispatch(addBoardName(data?.title));
    data?.lists.map((list) => {
      if (list.title.trim() !== "")
        dispatch(addAllColumns({ id: String(list.id), value: list.title }));
    });
    return () => {
      dispatch(resetColumns());
    };
  }, []);
  const handleCreateBoard = () => {
    const boardData: IBoardSidebarPost = {
      title: boardName,
      custom: { description: "dsf" },
    };
    renameBoardMutation.mutate(boardData);
  };
  return { newColumns, allColumns, boardMutation, handleCreateBoard, data };
}
