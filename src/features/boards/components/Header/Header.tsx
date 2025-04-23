import React from "react";
import Button from "../../../../UI/Button";
import "./header.css";
import iconVerticalEllipsis from "../../../../assets/iconVerticalEllipsis.svg";
import logoLight from "../../../../assets/logoLight.svg";
import IconChevronDown from "../../../../assets/IconChevronDown.svg";
import IconChevronUp from "../../../../assets/IconChevronUp.svg";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../customHooks/useTypedSelector";
import { sidebarShowAdd } from "../../../../store/slices/SidebarShowSlice";
import AddNewTask from "../AddNewTask/AddNewTask";
import { openModal } from "../../../../store/slices/ModalOpen";
import { useBoardQuery } from "../../useBoardQuery/useBoardQuery";
import { useParams } from "react-router-dom";
export default function Header() {
  const sidebarShowFlag = useTypedSelector((state) => state.sidebarShow.show);
  const dispatch = useDispatch();
  const { data } = useBoardQuery();
  const boardId = useParams().board_id;
  const boardTitle =
    data && data.find((board) => board.id === Number(boardId))?.title;
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoLight} className="logo" alt="Logo" />
        <img
          className="logo-btn"
          src={sidebarShowFlag ? IconChevronUp : IconChevronDown}
          onClick={() => dispatch(sidebarShowAdd(!sidebarShowFlag))}
        />
      </div>

      <div className="header__info">
        <h1 className="header__title">{boardTitle}</h1>

        <div className="header__create-board">
          <Button
            title="+ Add New Task"
            onClick={() => dispatch(openModal("addNewTask"))}
          />
          <img src={iconVerticalEllipsis} />
        </div>
      </div>
      <AddNewTask />
    </header>
  );
}
