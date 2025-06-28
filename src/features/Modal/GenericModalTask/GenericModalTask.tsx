import React from "react";
import Modal from "../Modal";
import Input from "../../../UI/Input";
import TextArea from "../../../UI/TextArea";
import IconCross from "../../../assets/IconCross.svg";
import { useCreateTaskMutation } from "../../boards/useBoardQuery/useBoardQuery";
import Button from "../../../UI/Button";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addTaskTitle,
  addTaskDescription,
} from "../../../store/slices/CreateTask";
import { useTypedSelector } from "../../../customHooks/useTypedSelector";
import Dropdown from "../../../UI/Dropdown";
export default function GenericModalTask() {
  const dispatch = useDispatch();
  const { taskTitle, taskDescription, columnId } = useTypedSelector(
    (state) => state.createTask
  );
  const boardId = useParams();
  const createTask = useCreateTaskMutation(boardId.board_id, columnId);

  return (
    <Modal title="Add New Task">
      <>
        <label className="modal__label">
          <p className="modal__board-title">Title</p>

          <Input
            placeholder="e.g. Web Design"
            value={taskTitle}
            onChange={(e) => dispatch(addTaskTitle(e.target.value))}
          />
        </label>
        <label className="modal__label">
          <p className="modal__board-title">Description(optional)</p>

          <TextArea
            value={taskDescription}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            onChange={(e) => dispatch(addTaskDescription(e.target.value))}
          />
        </label>
        <Dropdown />
        <Button title="Create Task" onClick={() => createTask.mutate()} />
      </>
    </Modal>
  );
}
