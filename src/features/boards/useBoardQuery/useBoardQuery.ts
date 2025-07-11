import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  changeTaskValueRequest,
  changeTaskPositionRequest,
  getBoard,
} from "../../../features/boards/api/useBoards";
import { createBoard } from "../../../features/boards/api/useBoards";
import { IBoardGet, IBoardPost } from "../../../types/IBoardData";
import { createTask } from "../../../features/boards/api/useBoards";
import { renameBoardRequest } from "../../../features/boards/api/useBoards";
import { closeModal } from "../../../store/slices/ModalOpen";
import { getBoardInfo } from "../../../features/boards/api/useBoards";
// import { useColumnMutation } from "../../columns/useColumnQuery/useColumnQuery";
import { useDispatch } from "react-redux";
import { createColumn } from "../../columns/api/useColumns";
import { useTypedSelector } from "../../../customHooks/useTypedSelector";
import { deleteColumn } from "../../../features/boards/api/useBoards";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onDeleteBoard } from "../../../features/boards/api/useBoards";
export const useBoardQuery = () => {
  return useQuery({
    queryKey: ["board"],
    queryFn: () => getBoard(),
    staleTime: 1000 * 60 * 5, // Кэшируем данные на 5 минут
    refetchOnMount: false, // Не делать повторный запрос при монтировании
  });
};
export const useDeleteColumnQuery = (listId: string) => {
  const boardId = useParams().board_id;
  return useMutation({
    mutationKey: ["deleteColumn"],
    mutationFn: () => deleteColumn(Number(boardId), Number(listId)),
  });
};
export const useBoardInfoQuery = () => {
  const boardId = useParams().board_id;
  console.log(boardId);
  return useQuery({
    queryKey: ["boardInfo", boardId],
    queryFn: () => getBoardInfo(boardId),
    staleTime: 1000 * 60 * 5, // Кэшируем данные на 5 минут
    refetchOnMount: false, // Не делать повторный запрос при монтировании
  });
};
export const useCreateTaskMutation = (
  boardId: string | undefined,
  listId: number | undefined
) => {
  const queryClient = useQueryClient();
  const { taskTitle, taskDescription } = useTypedSelector(
    (state) => state.createTask
  );
  const dispatch = useDispatch();
  const task = {
    title: taskTitle,
    list_id: listId,
    position: 1,
    description: taskDescription,
    custom: {
      deadline: "2022-08-31 12:00",
    },
  };

  return useMutation({
    mutationFn: () => createTask(boardId, task),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boardInfo"] });
      dispatch(closeModal("addNewTask"));
    },
  });
};

export const useCreateColumnsMutation = () => {
  const queryClient = useQueryClient();
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const createNewColumns = useTypedSelector(
    (state) => state.editBoard.newColumns
  );
  const deleteAllColumns = useTypedSelector(
    (state) => state.editBoard.deleteColumns
  );
  const { data } = useBoardInfoQuery();
  return useMutation({
    mutationFn: async (boardId: string) => {
      for (let i = 0; i < createNewColumns.length; i++) {
        const columnTitle: any = createNewColumns[i];
        if (columnTitle.value.trim() !== "") {
          const column = {
            title: columnTitle.value,
            position: data.lists.length,
          };

          await createColumn({ id: boardId, column });
          await delay(500);
        }
      }
      for (let i = 0; i < deleteAllColumns.length; i++) {
        await deleteColumn(Number(boardId), deleteAllColumns[i]);
        await delay(500);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["board"] });
      await queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
  });
};
export const useRenameBoardMutation = () => {
  const { board_id } = useParams();
  const boardId = String(board_id); // гарантируем строку
  const queryClient = useQueryClient();
  const createColumns = useCreateColumnsMutation();

  return useMutation({
    mutationFn: (board: IBoardPost) =>
      renameBoardRequest(Number(boardId), board),
    onSuccess: async () => {
      await createColumns.mutateAsync(boardId);

      await queryClient.invalidateQueries({ queryKey: ["board"] });
      await queryClient.invalidateQueries({ queryKey: ["columns"] });
      await queryClient.invalidateQueries({ queryKey: ["boardInfo", boardId] });
    },
  });
};
export const useBoardMutations = () => {
  const createColumns = useCreateColumnsMutation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBoard,
    onSuccess: async (newBoard: IBoardPost) => {
      //renameBoard.mutate(newBoard.title);
      await createColumns.mutateAsync(newBoard.id);
      await queryClient.invalidateQueries({ queryKey: ["board"] });
      await queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
  });
};
export const useChangeCardValuesMutations = () => {
  const queryClient = useQueryClient();
  const boardId = useParams().board_id;
  const { id, title, description } = useTypedSelector(
    (state) => state.CardModal
  );
  const columnId = useTypedSelector((state) => state.columnId.columnId);
  const changeTaskValue = {
    title: title,
    description: description,
    list_id: columnId,
  };

  return useMutation({
    mutationFn: () => changeTaskValueRequest(boardId, id, changeTaskValue),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boardInfo"] });
    },
  });
};
export const useChangeTaskPositionMutation = () => {
  const queryClient = useQueryClient();
  const boardId = useParams().board_id;
  return useMutation({
    mutationFn: (payload) => changeTaskPositionRequest(boardId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boardInfo"] });
    },
  });
};

export const useDeleteBoardMutation = () => {
  const queryClient = useQueryClient();
  const boardId = useParams().board_id;
  const navigate = useNavigate();
  const { data } = useBoardQuery();

  return useMutation({
    mutationFn: () => onDeleteBoard(boardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["board"] });
      const boardIndex = data?.findIndex(
        (board) => String(board.id) === boardId
      );
      const nextBoard = data[boardIndex + 1] || data[boardIndex - 1];
      if (nextBoard) {
        await navigate(`/board/${nextBoard.id}`);
      }
      await queryClient.invalidateQueries({ queryKey: ["board"] });
    },
  });
};
