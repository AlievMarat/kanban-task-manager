import React from "react";
import "./sidebar.css";
import SidebarBtn from "../UI/SidebarBtn";
import IconBoard from "../assets/IconBoard.svg";
import RadioButton from "../UI/RadioButton";
import IconHideSidebar from "../assets/IconHideSidebar.svg";
import { sidebarShowAdd } from "../store/slices/SidebarShowSlice";
import { isOpenModal } from "../store/slices/ModalSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../api/useBoards";
export default function Sidebar() {
  const sidebarShowFlag = useSelector((state: any) => state.sidebarShow.show);
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["board"],
    queryFn: () => getBoard(),
  });

  return (
    <>
      {sidebarShowFlag && (
        <section className="sidebar">
          <div className="sidebar__container">
            <p className="sidebar__title">ALL BOARDS</p>
            <div className="sidebar__inner">
              {data == undefined
                ? isLoading
                : data.map((board) => (
                    <p className="sidebar__item">
                      <img src={IconBoard} />
                      {board.title}
                    </p>
                  ))}
              <SidebarBtn
                title="+ Create New Board"
                onClick={() => dispatch(isOpenModal(true))}
                img={IconBoard}
                styles={{ color: "#635FC7" }}
              />
            </div>
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
        </section>
      )}
    </>
  );
}
