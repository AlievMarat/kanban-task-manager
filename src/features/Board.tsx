import { useTypedSelector } from "../customHooks/useTypedSelector";
import Header from "./boards/components/Header/Header";
import Sidebar from "./boards/components/Sidebar/Sidebar";
import AddNewBoard from "./boards/components/AddNewBoard/AddNewBoard";
import IconShowSidebar from "../assets/IconShowSidebar.svg";
import { sidebarShowAdd } from "../store/slices/SidebarShowSlice";
import "./board.css";
import { useDispatch } from "react-redux";
import "./global.css";
import { useBoardInfoQuery } from "./boards/useBoardQuery/useBoardQuery";
import Column from "./columns/components/Column/Column";
import AddNewColumn from "./columns/components/AddNewColumn/AddNewColumn";
import CreateFirstColumn from "./columns/components/CreateFirstColumn/CreateFirstColumn";
export default function Board() {
  const sidebarShowFlag = useTypedSelector((state) => state.sidebarShow.show);
  const { data } = useBoardInfoQuery();
  console.log(data);
  const dispatch = useDispatch();
  const modalFlags = useTypedSelector((state) => state.modalOpen.modalFlags);
  const modalOpenFlag = Object.entries(modalFlags).find(
    ([key, value]) => value
  )?.[0];
  console.log(data);
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
        <div className="columns__container">
          {data?.lists.map((list, index) => (
            <Column title={list.title} card={list.cards} />
          ))}
          {data?.lists.length !== 0 && <AddNewColumn />}
        </div>
        {data?.lists.length === 0 && <CreateFirstColumn />}
      </div>
    </div>
  );
}
