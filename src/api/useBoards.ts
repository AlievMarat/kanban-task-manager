import api from "../api/request";
export const postData = async (board) => {
  const request: any = await api.post(
    `${import.meta.env.VITE_API_URL}/board`,
    board
  );
  return request.id;
};
