import api from "../../../shared/api/request";
import {
  IBoardSidebarPost,
  IBoardSidebarPostResponse,
  IBoardSidebarGetResponse,
  IBoardGet,
} from "../../../types/IBoardData";
export const createBoard = async (board: IBoardSidebarPost) => {
  const request: IBoardSidebarPostResponse = await api.post(
    `${import.meta.env.VITE_API_URL}/board`,
    board
  );
  return request;
};
export const renameBoardRequest = async (
  boardId: number,
  board: IBoardSidebarPost
) => {
  const renameBoard = await api.put(
    `${import.meta.env.VITE_API_URL}/board/${boardId}`,
    board
  );
  return renameBoard;
};
export const deleteColumn = async (boardId: number, columnId: number) => {
  const deleteRequest = await api.delete(
    `${import.meta.env.VITE_API_URL}/board/${boardId}/list/${columnId}`
  );
  return deleteRequest;
};
export const getBoard = async () => {
  const response: IBoardSidebarGetResponse = await api.get(
    `${import.meta.env.VITE_API_URL}/board`
  );
  return response.boards;
};
export const getBoardInfo = async (boardId: string | undefined) => {
  const response: IBoardGet = await api.get(
    `${import.meta.env.VITE_API_URL}/board/${boardId}`
  );
  return response;
};

export const createTask = async (boardId: string | undefined, task) => {
  const response: any = await api.post(
    `${import.meta.env.VITE_API_URL}/board/${boardId}/card`,
    task
  );
  return response.id;
};
export const changeTaskValueRequest = async (
  boardId: string | undefined,
  taskId: number,
  newTask: any
) => {
  const response: any = await api.put(
    `${import.meta.env.VITE_API_URL}/board/${boardId}/card/${taskId}`,
    newTask
  );
  return response;
};
export const changeTaskPositionRequest = async (
  boardId: string | undefined,
  payload: object
) => {
  const request = await api.put(
    `${import.meta.env.VITE_API_URL}/board/${boardId}/card`,
    payload
  );
  return request;
};
