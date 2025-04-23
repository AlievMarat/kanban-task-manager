import React from "react";
import "./sidebar.css";
import SidebarBtn from "../../../../UI/SidebarBtn";
import IconBoard from "../../../../assets/IconBoard.svg";
import RadioButton from "../../../../UI/RadioButton";
import IconHideSidebar from "../../../../assets/IconHideSidebar.svg";
import { sidebarShowAdd } from "../../../../store/slices/SidebarShowSlice";
import { useTypedSelector } from "../../../../customHooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { useBoardQuery } from "../../useBoardQuery/useBoardQuery";
import { Link, useParams } from "react-router-dom";
import { openModal } from "../../../../store/slices/ModalOpen";

export default function Sidebar() {
  const sidebarShowFlag = useTypedSelector((state) => state.sidebarShow.show);
  const boardId = useParams().board_id;
  const dispatch = useDispatch();
  const { data } = useBoardQuery();
  return (
    <>
      {sidebarShowFlag && (
        <section className="sidebar">
          <div className="sidebar__container">
            <p className="sidebar__title">ALL BOARDS</p>
            <div className="sidebar__inner">
              {data?.map((board) => (
                <Link
                  className={`sidebar__item ${
                    Number(boardId) === board.id && "sidebar__item-active"
                  }`}
                  to={`/board/${board.id}`}
                >
                  <img src={IconBoard} />
                  {board.title}
                </Link>
              ))}
              <SidebarBtn
                title="+ Create New Board"
                onClick={() => dispatch(openModal("addNewBoard"))}
                img={IconBoard}
                styles={{ color: "#635FC7" }}
              />
            </div>
            <div className="sidebar__buttons">
              <RadioButton />
              <SidebarBtn
                title="Hide Sidebar"
                onClick={() => dispatch(sidebarShowAdd(!sidebarShowFlag))}
                img={IconHideSidebar}
                styles={{ marginBottom: "32px" }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
