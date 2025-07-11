import React from "react";
import Modal from "../Modal";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import { useEditBoardLogic } from "../../../customHooks/useEditBoardLogic";
import IconCross from "../../../assets/IconCross.svg";
import { useTypedSelector } from "../../../customHooks/useTypedSelector";
import {
  addNewColumns,
  newColumnValue,
  deleteForAllColumns,
  deleteForNewColumns,
} from "../../../store/slices/EditBoardSlice";
import { addBoardName } from "../../../store/slices/CreateBoard";
import { useDispatch } from "react-redux";
export default function EditBoard() {
  const { newColumns, allColumns, handleCreateBoard } = useEditBoardLogic();
  const boardName = useTypedSelector((state) => state.createBoard.title);
  const dispatch = useDispatch();
  console.log(boardName);
  return (
    <Modal title="Edit Board">
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
            {allColumns.map((column, index) => (
              <Input
                placeholder="e.g. Web Design"
                value={column.value}
                onChange={(e) =>
                  dispatch(newColumnValue({ index, value: e.target.value }))
                }
              >
                <img
                  onClick={() => {
                    dispatch(deleteForAllColumns({ index: 0, id: column?.id }));
                    console.log(column.id);
                  }}
                  src={IconCross}
                />
              </Input>
            ))}
            {newColumns.map((inputValue, index) => (
              <Input
                placeholder="e.g. Web Design"
                value={inputValue.value}
                onChange={(e) =>
                  dispatch(newColumnValue({ index, value: e.target.value }))
                }
              >
                <img
                  onClick={() => dispatch(deleteForNewColumns(index))}
                  src={IconCross}
                />
              </Input>
            ))}
            <Button
              title="+ Add New Column"
              onClick={() => dispatch(addNewColumns())}
              style={{ backgroundColor: "#FFFFFF", color: "#635FC7" }}
            />
          </div>
        </label>
        <Button title="Save changes" onClick={handleCreateBoard} />
      </>
    </Modal>
  );
}
