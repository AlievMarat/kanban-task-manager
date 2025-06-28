import React from "react";
import Modal from "../Modal";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import { closeModal } from "../../../store/slices/ModalOpen";
import { useEffect } from "react";
import IconCross from "../../../assets/IconCross.svg";
import { useTypedSelector } from "../../../customHooks/useTypedSelector";
import {
  useBoardInfoQuery,
  useBoardMutations,
  useRenameBoardMutation,
} from "../../boards/useBoardQuery/useBoardQuery";
import {
  addNewColumns,
  newColumnValue,
  addAllColumns,
  resetColumns,
  deleteForAllColumns,
  deleteForNewColumns,
} from "../../../store/slices/EditBoardSlice";
import { addBoardName } from "../../../store/slices/CreateBoard";
import { useDispatch } from "react-redux";
export default function EditBoard() {
  const newColumns = useTypedSelector((state) => state.editBoard.newColumns);
  const boardName = useTypedSelector((state) => state.createBoard.title);
  const allColumns = useTypedSelector((state) => state.editBoard.allColumns);
  const { data } = useBoardInfoQuery();
  const dispatch = useDispatch();
  const boardMutation = useBoardMutations();
  const renameBoardMutation = useRenameBoardMutation();
  console.log(boardName);
  useEffect(() => {
    dispatch(addBoardName(data.title));
    data.lists.map((list) => {
      if (list.title.trim() !== "")
        dispatch(addAllColumns({ id: list.id, value: list.title }));
    });
    return () => {
      dispatch(resetColumns());
    };
  }, []);
  const handleCreateBoard = () => {
    const boardData: any = {
      title: boardName,
      custom: { description: "dsf" },
    };
    renameBoardMutation.mutate(boardData);
  };
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
