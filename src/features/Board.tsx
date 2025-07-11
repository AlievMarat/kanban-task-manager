import { useEffect, useState } from "react";
import { useTypedSelector } from "../customHooks/useTypedSelector";
import Header from "./boards/components/Header/Header";
import Sidebar from "./boards/components/Sidebar/Sidebar";
import AddNewBoard from "./boards/components/AddNewBoard/AddNewBoard";
import IconShowSidebar from "../assets/IconShowSidebar.svg";
import { sidebarShowAdd } from "../store/slices/SidebarShowSlice";
import "./board.css";
import { useChangeTaskPositionMutation } from "./boards/useBoardQuery/useBoardQuery";
import { useDispatch } from "react-redux";
import "./global.css";
import { useBoardInfoQuery } from "./boards/useBoardQuery/useBoardQuery";
import Column from "./columns/components/Column/Column";
import AddNewColumn from "./columns/components/AddNewColumn/AddNewColumn";
import CreateFirstColumn from "./columns/components/CreateFirstColumn/CreateFirstColumn";
import CardModal from "./Modal/CardModal/CardModal";
import { useQueryClient } from "@tanstack/react-query";
import { ICard } from "../types/IBoardData";
import "./theme.css";
import { useDeleteBoardMutation } from "./boards/useBoardQuery/useBoardQuery";
import { useParams } from "react-router-dom";
import DeleteBoard from "./boards/components/DeleteBoard/DeleteBoard";
import { closeModal } from "../store/slices/ModalOpen";
export default function Board() {
  const sidebarShowFlag = useTypedSelector((state) => state.sidebarShow.show);
  const [dropSlot, setDropSlot] = useState(false);
  const queryClient = useQueryClient();
  const deleteBoardMutation = useDeleteBoardMutation();
  const boardId = useParams().board_id;
  const deleteCardModalFlag = useTypedSelector(
    (state) => state.modalOpen.modalFlags.deleteBoard
  );
  const openCardModal = useTypedSelector(
    (state) => state.modalOpen.modalFlags.cardModal
  );
  const currentTheme = useTypedSelector((state) => state.themeSlice.theme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  });
  const { data } = useBoardInfoQuery();
  const [hoveredPosition, setHoveredPosition] = useState<{
    listIndex: number;
    cardIndex: number;
  } | null>(null);
  const dispatch = useDispatch();

  const [draggedCard, setDraggedCard] = useState<{
    listIndex: number;
    cardIndex: number;
  } | null>(null);

  const changeTaskPosition = useChangeTaskPositionMutation();

  const handleDragStart = (listIndex: number, cardIndex: number) => {
    setDraggedCard({ listIndex, cardIndex });
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDragLeave = () => {
    if (!draggedCard || !data) return;
    setDropSlot(true);
  };
  const handleDragEnter = (
    e: React.DragEvent,
    listIndex: number,
    cardIndex: number
  ) => {
    e.preventDefault();
    if (!draggedCard) return;

    const targetElement = e.currentTarget as HTMLElement;
    const rect = targetElement.getBoundingClientRect();
    const mouseY = e.clientY;
    const middleY = rect.top + rect.height / 2;
    const insertIndex = mouseY > middleY ? cardIndex + 1 : cardIndex;

    setHoveredPosition({ listIndex, cardIndex: insertIndex });
    setDropSlot(true);
  };

  const handleDrop = () => {
    if (!draggedCard || !data) return;

    const targetListIndex = hoveredPosition
      ? hoveredPosition.listIndex
      : draggedCard.listIndex; // На всякий случай fallback

    const targetCardIndex = hoveredPosition ? hoveredPosition.cardIndex : 0;

    const newLists = structuredClone(data.lists);
    const [movedCard] = newLists[draggedCard.listIndex].cards.splice(
      draggedCard.cardIndex,
      1
    );
    newLists[targetListIndex].cards.splice(targetCardIndex, 0, movedCard);
    console.log(newLists);
    queryClient.setQueryData(
      ["boardInfo", boardId],
      (oldData: typeof data | undefined) => {
        return {
          ...oldData,
          lists: newLists,
        };
      }
    );
    const payload = newLists.flatMap((list) =>
      list.cards.map((card, index) => ({
        id: card.id,
        position: index + 1,
        list_id: list.id,
      }))
    );

    changeTaskPosition.mutate(payload);
    setDraggedCard(null);
    setHoveredPosition(null);
    setDropSlot(false);
  };

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
          {data?.lists.map((list, listIndex) => (
            <Column
              key={list.id}
              listId={list.id}
              title={list.title}
              card={list.cards}
              dropSlot={dropSlot}
              listIndex={listIndex}
              draggedCard={draggedCard}
              hoveredPosition={hoveredPosition}
              onDragStart={handleDragStart}
              onDragLeave={handleDragLeave}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
          {(data?.lists?.length ?? 1) > 0 && <AddNewColumn />}
        </div>
        {(data?.lists?.length ?? 0) === 0 && <CreateFirstColumn />}
        {openCardModal && <CardModal />}
        {deleteCardModalFlag && (
          <DeleteBoard
            title="board"
            itemTitle={data?.title}
            onDelete={() => {
              deleteBoardMutation.mutate();
              dispatch(closeModal("deleteBoard"));
            }}
          />
        )}
      </div>
    </div>
  );
}
