import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import List from "./List";
import IconShowSidebar from "../assets/IconShowSidebar.svg";
import { sidebarShowAdd } from "../store/slices/SidebarShowSlice";
import { useSelector } from "react-redux";
import "./board.css";
import { useDispatch } from "react-redux";
import "./global.css";
import Modal from "./Modal/Modal";
import Input from "../UI/Input";
import { postData } from "../api/useBoards";
import Button from "../UI/Button";
export default function Board() {
  const sidebarShowFlag = useSelector((state: any) => state.sidebarShow.show);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: any) => state.modalSlice.open);
  return (
    <div className="board">
      <Header />
      {isModalOpen && (
        <Modal title="Add New Board">
          <>
            <label className="modal__label">
              Board Name
              <Input
                placeholder="e.g. Web Design"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {/* <Input placeholder="e.g. Web Design" /> */}
              <Button
                title="Save Changes"
                onClick={() =>
                  postData({
                    title: inputValue,
                    custom: { description: "dsf" },
                  })
                }
              />
            </label>
          </>
        </Modal>
      )}
      <div className="board__container">
        <Sidebar />
        {sidebarShowFlag === false && (
          <img
            className="open-sidebar"
            onClick={() => dispatch(sidebarShowAdd(true))}
            src={IconShowSidebar}
          />
        )}
      </div>
    </div>
  );
}
