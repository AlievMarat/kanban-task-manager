import { useParams } from "react-router-dom";
import api from "../../../shared/api/request";
import { ICreateColumn } from "../../../types/IBoardData";
export const createColumn = ({ id, column }: ICreateColumn) => {
  const request: any = api.post(
    `${import.meta.env.VITE_API_URL}/board/${id}/list`,
    column
  );
  return request.id;
};
