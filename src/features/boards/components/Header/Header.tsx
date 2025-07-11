import React from "react";
import Button from "../../../../UI/Button";
import "./header.css";
import iconVerticalEllipsis from "../../../../assets/iconVerticalEllipsis.svg";
import logoLight from "../../../../assets/logoLight.svg";
import logoDark from "../../../../assets/logoDark.svg";
import IconChevronDown from "../../../../assets/IconChevronDown.svg";
import IconChevronUp from "../../../../assets/IconChevronUp.svg";
import { sidebarShowAdd } from "../../../../store/slices/SidebarShowSlice";
import AddNewTask from "../AddNewTask/AddNewTask";
import MenuButton from "../../../../UI/MenuButton";
import { useHeaderLogic } from "../../../../customHooks/useHeaderLogic";
import { useBoardInfoQuery } from "../../useBoardQuery/useBoardQuery";
import { useDispatch } from "react-redux";
export default function Header() {
  const {
    sidebarShowFlag,
    currentTheme,
    openMenu,
    boardTitle,
    editBoard,
    deleteBoard,
    addTask,
    setOpenMenu,
  } = useHeaderLogic();
  const dispatch = useDispatch();
  const { data } = useBoardInfoQuery();
  return (
    <header className="header" onClick={() => openMenu && setOpenMenu(false)}>
      <div className="logo-container">
        <img
          src={currentTheme === "dark" ? logoLight : logoDark}
          className="logo"
          alt="Logo"
        />
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
            onClick={() => addTask()}
            disabled={!data?.lists?.length}
          />
          <img
            src={iconVerticalEllipsis}
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu((prev) => !prev);
            }}
          />
        </div>
      </div>
      <AddNewTask />
      {openMenu && (
        <MenuButton title="Board" onEdit={editBoard} onDelete={deleteBoard} />
      )}
    </header>
  );
}
