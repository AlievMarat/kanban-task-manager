import React, { useState } from "react";
import "../Column/column.css";
import { ICard } from "../../../../types/IBoardData";
import { setCardModalInfo } from "../../../../store/slices/cardModalInfo";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../store/slices/ModalOpen";
import { addColumnId } from "../../../../store/slices/columnId";

interface IList {
  id: number;
  title: string;
  card: ICard[];
  dropSlot: boolean;
  listIndex: number;
  hoveredPosition: any;
  draggedCard: any;
  onDragStart: (listIndex: number, cardIndex: number) => void;
  onDragLeave: () => void;
  onDragEnter: (
    e: React.DragEvent,
    listIndex: number,
    cardIndex: number
  ) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
}

export default function Column({
  id,
  title,
  card,
  dropSlot,
  listIndex,
  hoveredPosition,
  onDragStart,
  draggedCard,
  onDragLeave,
  onDragEnter,
  onDragOver,
  onDrop,
}: IList) {
  const dispatch = useDispatch();
  //const cardPositionIsNullList = card.length === 0 ? 0 : listIndex;
  return (
    <div
      className="column"
      onDragOver={onDragOver}
      onDragEnter={(e) => {
        if (card.length === 0) {
          onDragEnter(e, listIndex, 0); // Только для пустых колонок
        }
      }}
      onDrop={onDrop}
    >
      <p className="column__title" onDragOver={onDragOver} onDrop={onDrop}>
        {title}
      </p>

      {/* Слот для пустого списка */}
      {card.length === 0 &&
        hoveredPosition &&
        hoveredPosition.listIndex === listIndex &&
        hoveredPosition.cardIndex === 0 && (
          <div className="slot-placeholder"></div>
        )}

      {/* Рендер карточек */}
      {card.map((item: ICard, cardIndex: number) => {
        const isDragging =
          draggedCard?.listIndex === listIndex &&
          draggedCard?.cardIndex === cardIndex &&
          dropSlot == true;

        if (isDragging) return null;

        return (
          <React.Fragment key={item.id}>
            {/* Слот перед каждой карточкой */}
            {hoveredPosition &&
              hoveredPosition.listIndex === listIndex &&
              hoveredPosition.cardIndex === cardIndex && (
                <div className="slot-placeholder"></div>
              )}

            <div
              draggable
              className="column__card"
              onDragStart={() => onDragStart(listIndex, cardIndex)}
              onDragLeave={() => onDragLeave()}
              onDragEnter={(e) => onDragEnter(e, listIndex, cardIndex)}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              {item.title}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
