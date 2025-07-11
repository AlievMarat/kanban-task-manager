import React from "react";
import ReactDOM from "react-dom";
import "../Modal/modal.css";
import { closeModal } from "../../store/slices/ModalOpen";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../customHooks/useTypedSelector";
import {
  deleteForAllColumns,
  resetColumns,
} from "../../store/slices/EditBoardSlice";
interface IModal {
  title: string;
  children: React.ReactNode;
}

export default function Modal({ title, children }: IModal) {
  const dispatch = useDispatch();
  const modalFlags = useTypedSelector((state) => state.modalOpen.modalFlags);
  const closeModalKey = Object.entries(modalFlags).find(
    ([key, value]) => value
  )?.[0];
  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <section
      className="modal"
      onClick={() => {
        dispatch(closeModal(closeModalKey));
        dispatch(resetColumns());
      }}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <p className="modal__title">{title}</p>
        {children}
      </div>
    </section>,
    modalRoot
  );
}
