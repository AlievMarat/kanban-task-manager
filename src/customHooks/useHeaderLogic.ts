import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { useParams } from "react-router-dom";
import { useBoardQuery } from "../features/boards/useBoardQuery/useBoardQuery";
import { openModal } from "../store/slices/ModalOpen";
import { addTaskTitle } from "../store/slices/CreateTask";
export function useHeaderLogic() {
  const sidebarShowFlag = useTypedSelector((state) => state.sidebarShow.show);
  const currentTheme = useTypedSelector((state) => state.themeSlice.theme);
  const dispatch = useDispatch();
  const { data } = useBoardQuery();
  const boardId = useParams().board_id;
  const [openMenu, setOpenMenu] = useState(false);
  const boardTitle =
    data && data.find((board) => board.id === Number(boardId))?.title;
  const addTask = () => {
    dispatch(openModal("addNewTask"));
    dispatch(addTaskTitle(""));
  };
  function editBoard() {
    dispatch(openModal("editBoard"));
    setOpenMenu(false);
  }
  function deleteBoard() {
    dispatch(openModal("deleteBoard"));
    setOpenMenu(false);
  }
  return {
    sidebarShowFlag,
    currentTheme,
    openMenu,
    boardTitle,
    addTask,
    setOpenMenu,
    editBoard,
    deleteBoard,
    openModal,
  };
}
