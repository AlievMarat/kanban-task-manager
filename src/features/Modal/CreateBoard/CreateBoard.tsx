import React from "react";
import Modal from "../Modal";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import { useDispatch } from "react-redux";
import { useCreateBoardLogic } from "../../../customHooks/useCreateBoardLogic";
import {
  addNewColumns,
  newColumnValue,
} from "../../../store/slices/EditBoardSlice";
import { addBoardName } from "../../../store/slices/CreateBoard";

export default function GenericModal() {
  const { boardName, newColumns, handleCreateBoard } = useCreateBoardLogic();
  const dispatch = useDispatch();
  return (
    <Modal title="Add New Board">
      <>
        <label className="modal__label">
          <p className="modal__board-title">Board Name</p>
          <Input
            placeholder="e.g. Web Design"
            value={boardName}
            onChange={(e) => dispatch(addBoardName(e.target.value))}
          />
        </label>
        <label className="modal__label">
          <p className="modal__board-title">Board Columns</p>
          <div className="modal__column">
            {newColumns.map((column, index) => (
              <Input
                placeholder="e.g. Web Design"
                value={column.value}
                onChange={(e) =>
                  dispatch(newColumnValue({ index, value: e.target.value }))
                }
              />
            ))}
            <Button
              title="+ Add New Column"
              onClick={() => dispatch(addNewColumns())}
              style={{ backgroundColor: "#FFFFFF", color: "#635FC7" }}
            />
          </div>
        </label>
        <Button title="Create Board" onClick={handleCreateBoard} />
      </>
    </Modal>
  );
}
