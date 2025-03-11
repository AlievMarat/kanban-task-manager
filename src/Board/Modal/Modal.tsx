import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { isOpenModal } from "../../store/slices/ModalSlice";
import "../Modal/modal.css";

interface IModal {
  title: string;
  children: React.ReactNode;
}

export default function Modal({ title, children }: IModal) {
  const dispatch = useDispatch();
  const modalRoot = document.getElementById("modal");

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <section className="modal" onClick={() => dispatch(isOpenModal(false))}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <p className="modal__title">{title}</p>
        {children}
      </div>
    </section>,
    modalRoot
  );
}
