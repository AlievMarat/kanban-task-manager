import React from "react";
import Modal from "../Modal";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import IconCross from "../../../assets/IconCross.svg";
import { useTypedSelector } from "../../../customHooks/useTypedSelector";
import {
  addColumnValue,
  addBoardNameValue,
  addInput,
  deleteInputs,
  editColumn,
} from "../../../store/slices/InputValuesSlice";

import { useDispatch } from "react-redux";
import { useBoardInfoQuery } from "../../boards/useBoardQuery/useBoardQuery";
interface IHandleCreate {
  genericTitle: string;
  genericButton: string;
  handleCreateBoard: () => void;
}
export default function GenericModal({
  genericTitle,
  genericButton,
  handleCreateBoard,
}: IHandleCreate) {
  const { data } = useBoardInfoQuery();
  const dispatch = useDispatch();
  const boardName = useTypedSelector(
    (state) => state.InputValuesSlice.boardName
  );
  const boardColumns = useTypedSelector(
    (state) => state.InputValuesSlice.columns
  );
  const { editBoard } = useTypedSelector((state) => state.modalOpen.modalFlags);
  const { editColumns } = useTypedSelector((state) => state.InputValuesSlice);
  React.useEffect(() => {
    dispatch(addBoardNameValue({ value: data.title }));
    if (editBoard) {
      data.lists.map((list, index) => {
        dispatch(
          addColumnValue({
            index: index,
            value: list.title,
          })
        );
      });
      editColumns.map((column, index) => {
        dispatch(editColumn({ index: index, value: column.value }));
      });
    } else {
      data.lists.map((list, index) => {
        dispatch(deleteInputs(index));
      });
    }
  }, [editBoard === true]);
  return (
    <Modal title={genericTitle}>
      <>
        <label className="modal__label">
          <p className="modal__board-title">Board Name</p>

          <Input
            placeholder="e.g. Web Design"
            value={boardName}
            onChange={(e) =>
              dispatch(addBoardNameValue({ value: e.target.value }))
            }
          />
        </label>
        <label className="modal__label">
          <p className="modal__board-title">Board Columns</p>
          <div className="modal__column">
            {boardColumns.map((value, index) => (
              <Input
                placeholder="e.g. Web Design"
                value={value.value}
                onChange={(e) => {
                  if (typeof index === "number") {
                    // Проверка, чтобы не передавать undefined
                    dispatch(
                      addColumnValue({
                        index: index,
                        value: e.target.value,
                      })
                    );
                  }
                }}
              >
                <img
                  className="column-close"
                  src={IconCross}
                  onClick={() => dispatch(deleteInputs(index))}
                />
              </Input>
            ))}

            <Button
              title="+ Add New Column"
              onClick={() =>
                dispatch(addInput({ inputId: boardColumns.length + 1 }))
              }
              style={{ backgroundColor: "#FFFFFF", color: "#635FC7" }}
            />
          </div>
        </label>
        <Button title={genericButton} onClick={() => handleCreateBoard()} />
      </>
    </Modal>
  );
}
