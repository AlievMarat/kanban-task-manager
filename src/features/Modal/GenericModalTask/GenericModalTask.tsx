import React from "react";
import Modal from "../Modal";
import Input from "../../../UI/Input";
import TextArea from "../../../UI/TextArea";
import IconCross from "../../../assets/IconCross.svg";
import Button from "../../../UI/Button";
interface IGenericTask {
  title: string;
  createTask: () => void;
}
export default function GenericModalTask({ title, createTask }: IGenericTask) {
  return (
    <Modal title={title}>
      <>
        <label className="modal__label">
          <p className="modal__board-title">Title</p>

          <Input
            placeholder="e.g. Web Design"
            value=""
            onChange={(e) => null}
          />
        </label>
        <label className="modal__label">
          <p className="modal__board-title">Title</p>

          <TextArea
            value=""
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            onChange={() => null}
          />
        </label>
        <label className="subtasks">
          <p className="modal__board-title">Subtasks</p>
          <Input placeholder="e.g. Make coffee" value="" onChange={() => null}>
            <img src={IconCross} />
          </Input>
          <Button
            title="+ Add New Subtask"
            className="add-new-sub"
            onClick={createTask}
          />
        </label>
      </>
    </Modal>
  );
}
