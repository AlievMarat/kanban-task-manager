import { useTypedSelector } from "../customHooks/useTypedSelector";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddNewBoard from "./AddNewBoard/AddNewBoard";
import IconShowSidebar from "../assets/IconShowSidebar.svg";
import { sidebarShowAdd } from "../store/slices/SidebarShowSlice";
import "./board.css";
import { useDispatch } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./global.css";

export default function Board() {
  const sidebarShowFlag = useTypedSelector((state) => state.sidebarShow.show);
  const dispatch = useDispatch();
  return (
    <div className="board">
      <Header />
      <AddNewBoard />
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
