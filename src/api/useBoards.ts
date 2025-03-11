import api from "../api/request";

import {
  IBoardPost,
  IBoardPostResponse,
  IBoardGetResponse,
} from "../types/IBoardData";
export const createBoard = async (board: IBoardPost) => {
  const request: IBoardPostResponse = await api.post(
    `${import.meta.env.VITE_API_URL}/board`,
    board
  );
  return request.id;
};
export const getBoard = async () => {
  const response: IBoardGetResponse = await api.get(
    `${import.meta.env.VITE_API_URL}/board`
  );
  return response.boards;
};
