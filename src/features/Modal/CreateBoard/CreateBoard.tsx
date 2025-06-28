import React, { useEffect } from "react";
import Modal from "../Modal";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import { useTypedSelector } from "../../../customHooks/useTypedSelector";
import { useBoardMutations } from "../../boards/useBoardQuery/useBoardQuery";
import { useDispatch } from "react-redux";
import {
  addNewColumns,
  newColumnValue,
  resetColumns,
} from "../../../store/slices/EditBoardSlice";
import {
  addBoardName,
  resetBoardName,
} from "../../../store/slices/CreateBoard";
export default function GenericModal() {
  const createBoardMutation = useBoardMutations();
  const boardName = useTypedSelector((state) => state.createBoard.title);
  const newColumns = useTypedSelector((state) => state.editBoard.newColumns);
  const dispatch = useDispatch();
  const handleCreateBoard = () => {
    const boardData: any = {
      title: boardName,
      custom: { description: "dsf" },
    };
    createBoardMutation.mutate(boardData);
  };
  useEffect(() => {
    dispatch(resetColumns());
    dispatch(resetBoardName());
  }, []);
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
