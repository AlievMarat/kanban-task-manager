import api from "../../../shared/api/request";
import { useParams } from "react-router-dom";
import {
  IBoardSidebarPost,
  IBoardSidebarPostResponse,
  IBoardSidebarGetResponse,
} from "../../../types/IBoardData";
export const createBoard = async (board: IBoardSidebarPost) => {
  const request: IBoardSidebarPostResponse = await api.post(
    `${import.meta.env.VITE_API_URL}/board`,
    board
  );
  return request;
};
export const renameBoardRequest = async (boardId: number, board) => {
  const renameBoard = await api.put(
    `${import.meta.env.VITE_API_URL}/board/${boardId}`,
    board
  );
  return renameBoard;
};
export const deleteColumn = async (boardId: number, columnId: number) => {
  const deleteRequest = await api.delete(
    `${import.meta.env.VITE_API_URL}/${boardId}/${columnId}`
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
  const response: any = await api.get(
    `${import.meta.env.VITE_API_URL}/board/${boardId}`
  );
  return response;
};
