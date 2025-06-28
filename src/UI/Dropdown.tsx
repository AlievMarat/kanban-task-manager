import React from "react";
import IconChevronUp from "../assets/IconChevronUp.svg";
import IconChevronDown from "../assets/IconChevronDown.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskId } from "../store/slices/CreateTask";
import "./dropDown.css";
import { useBoardInfoQuery } from "../features/boards/useBoardQuery/useBoardQuery";
export default function Dropdown() {
  const { data } = useBoardInfoQuery();
  const dispatch = useDispatch();
  const [dropDownOpen, setIsDropDownOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState("Doing");
  function createTask(id: number, title: string) {
    setColumnTitle(title);
    dispatch(addTaskId(id));
  }
  return (
    <div className="dropdown">
      <p className="modal__board-title">Status</p>
      <div className="select" onClick={() => setIsDropDownOpen(!dropDownOpen)}>
        <p className="select-title">{columnTitle}</p>
        <img
          className="select-img"
          onClick={() => setIsDropDownOpen(!dropDownOpen)}
          src={dropDownOpen ? IconChevronUp : IconChevronDown}
        />
      </div>
      {dropDownOpen && (
        <div className="select-open">
          {data?.lists.map((column) => (
            <p
              className="select-item"
              onClick={() => createTask(column.id, column.title)}
            >
              {column.title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
