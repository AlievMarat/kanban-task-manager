import React from "react";
import Modal from "../../../Modal/Modal";
import "./deleteBoard.css";
import Button from "../../../../UI/Button";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../store/slices/ModalOpen";
interface IDeleteBoard {
  title: string | undefined;
  itemTitle: string | undefined;
  onDelete: () => void;
}
export default function DeleteBoard({
  title,
  itemTitle,
  onDelete,
}: IDeleteBoard) {
  const dispatch = useDispatch();
  return (
    <Modal title={`Delete this ${title}`}>
      <p className="delete-board__text">
        Are you sure you want to delete the {itemTitle} board? This action will
        remove all columns and tasks and cannot be reversed.
      </p>
      <div className="delete__buttons">
        <Button title="Delete" onClick={onDelete} />
        <Button
          title="Cancel"
          onClick={() => {
            dispatch(closeModal("deleteBoard"));
          }}
        />
      </div>
    </Modal>
  );
}
