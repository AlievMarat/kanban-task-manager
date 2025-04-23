import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getBoard } from "../../../features/boards/api/useBoards";
import { createBoard } from "../../../features/boards/api/useBoards";
import { IBoardPost } from "../../../types/IBoardData";
import { renameBoardRequest } from "../../../features/boards/api/useBoards";
import { getBoardInfo } from "../../../features/boards/api/useBoards";
// import { useColumnMutation } from "../../columns/useColumnQuery/useColumnQuery";
import { createColumn } from "../../columns/api/useColumns";
import { useTypedSelector } from "../../../customHooks/useTypedSelector";
import { useParams } from "react-router-dom";
export const useBoardQuery = () => {
  return useQuery({
    queryKey: ["board"],
    queryFn: () => getBoard(),
    staleTime: 1000 * 60 * 5, // Кэшируем данные на 5 минут
    refetchOnMount: false, // Не делать повторный запрос при монтировании
  });
};
// export const deleteColumn=()=>{
//   return useMutation({
//     mutationKey: ["deleteColumn"],
//     mutationFn: ,
//   })
// }
export const useBoardInfoQuery = () => {
  const boardId = useParams().board_id;
  console.log(boardId);
  return useQuery({
    queryKey: ["boardInfo", boardId],
    queryFn: () => getBoardInfo(boardId),
    //enabled: !!boardId,
    staleTime: 1000 * 60 * 5, // Кэшируем данные на 5 минут
    refetchOnMount: false, // Не делать повторный запрос при монтировании
  });
};
export const useCreateColumnsMutation = () => {
  const queryClient = useQueryClient();
  const { columns, editColumns } = useTypedSelector(
    (state) => state.InputValuesSlice
  );
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  console.log(columns);
  return useMutation({
    mutationFn: async (boardId: string) => {
      for (let i = 0; i < columns.length; i++) {
        const columnTitle = columns[i];
        const column = {
          title: columnTitle.value,
          position: i,
        };

        await createColumn({ id: boardId, column });
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
  const boardId = useParams().board_id;
  const queryClient = useQueryClient();
  const createColumns = useCreateColumnsMutation();
  return useMutation({
    mutationFn: (board: any) => renameBoardRequest(Number(boardId), board),
    onSuccess: async () => {
      await createColumns.mutateAsync(boardId);
      await queryClient.invalidateQueries({ queryKey: ["board"] });
      await queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
  });
};
export const useBoardMutations = () => {
  const createColumns = useCreateColumnsMutation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBoard,
    onSuccess: async (newBoard: IBoardPost) => {
      await createColumns.mutateAsync(newBoard.id);
      await queryClient.invalidateQueries({ queryKey: ["board"] });
      await queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
  });
};
