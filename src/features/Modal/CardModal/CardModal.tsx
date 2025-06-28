import React from "react";
import Modal from "../Modal";
import { useTypedSelector } from "../../../customHooks/useTypedSelector";
import Button from "../../../UI/Button";
import "./CardModal.css";
import Dropdown from "../../../UI/Dropdown";
import Input from "../../../UI/Input";
import { useDispatch } from "react-redux";
import { addTaskTitle } from "../../../store/slices/CreateTask";
import { addTaskDescription } from "../../../store/slices/CreateTask";
import { useChangeCardValuesMutations } from "../../boards/useBoardQuery/useBoardQuery";
import { setTitle } from "../../../store/slices/cardModalInfo";
import { setDescription } from "../../../store/slices/cardModalInfo";
import TextArea from "../../../UI/TextArea";
export default function CardModal() {
  const { title, description } = useTypedSelector((state) => state.CardModal);
  const changeCardValue = useChangeCardValuesMutations();
  console.log(title);
  const dispatch = useDispatch();
  return (
    <Modal title="Edit Task">
      <>
        <label className="modal__label">
          <p className="modal__board-title">Title</p>

          <Input
            placeholder="e.g. Web Design"
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        </label>
        <label className="modal__label">
          <p className="modal__board-title">Description(optional)</p>

          <TextArea
            value={description}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
        </label>
        <Dropdown />
        <Button title="Edit Task" onClick={() => changeCardValue.mutate()} />
      </>
    </Modal>
  );
}
