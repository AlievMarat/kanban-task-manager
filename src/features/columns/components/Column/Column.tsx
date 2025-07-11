import React, { useRef, useEffect, useState } from "react";
import "../Column/column.css";
import { ICard } from "../../../../types/IBoardData";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../store/slices/ModalOpen";
import { IList } from "../../../../types/IBoardData";
import {
  setDescription,
  setTitle,
  setCardId,
} from "../../../../store/slices/cardModalInfo";
import { addColumnId } from "../../../../store/slices/columnId";
import { useTypedSelector } from "../../../../customHooks/useTypedSelector";
export default function Column({
  listId,
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
  const lastCardRef = useRef<HTMLDivElement | null>(null);
  const [isMouseBelowLastCard, setIsMouseBelowLastCard] = useState(false);

  const handleColumnDragEnter = (e: React.DragEvent) => {
    if (card.length === 0) {
      onDragEnter(e, listIndex, 0);
    } else if (lastCardRef.current) {
      const rect = lastCardRef.current.getBoundingClientRect();
      const mouseY = e.clientY;

      if (mouseY > rect.bottom) {
        setIsMouseBelowLastCard(true);
        onDragEnter(e, listIndex, card.length); // Вставить в конец
      } else {
        setIsMouseBelowLastCard(false);
      }
    }
  };
  const columnId = useTypedSelector((state) => state.columnId.columnId);
  console.log(columnId);
  useEffect(() => {
    if (!hoveredPosition || hoveredPosition.listIndex !== listIndex) {
      setIsMouseBelowLastCard(false);
    }
  }, [hoveredPosition, listIndex]);

  return (
    <div
      className="column"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnter={handleColumnDragEnter}
    >
      <p className="column__title">{title}</p>

      {card.length === 0 &&
        hoveredPosition?.listIndex === listIndex &&
        hoveredPosition?.cardIndex === 0 && (
          <div
            className="slot-placeholder"
            onDragOver={onDragOver}
            onDragEnter={(e) => onDragEnter(e, listIndex, 0)}
          ></div>
        )}

      {card.map((item: ICard, cardIndex: number) => {
        const isDragging =
          draggedCard?.listIndex === listIndex &&
          draggedCard?.cardIndex === cardIndex &&
          dropSlot;

        if (isDragging) return null;

        const isSlotHere =
          hoveredPosition &&
          hoveredPosition.listIndex === listIndex &&
          hoveredPosition.cardIndex === cardIndex;

        const isLastCard = cardIndex === card.length - 1;

        return (
          <React.Fragment key={item.id}>
            {isSlotHere && (
              <div
                className="slot-placeholder"
                onDragOver={onDragOver}
                onDragEnter={(e) => onDragEnter(e, listIndex, cardIndex)}
              ></div>
            )}

            <div
              ref={isLastCard ? lastCardRef : null}
              draggable
              className="column__card"
              onDragStart={() => onDragStart(listIndex, cardIndex)}
              onDragLeave={onDragLeave}
              onDragEnter={(e) => onDragEnter(e, listIndex, cardIndex)}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onClick={() => {
                dispatch(setCardId(item.id));
                dispatch(addColumnId(listId));
                dispatch(setTitle(item.title));
                dispatch(setDescription(item.description));
                dispatch(openModal("cardModal"));
              }}
            >
              {item.title}
            </div>
          </React.Fragment>
        );
      })}

      {hoveredPosition &&
        hoveredPosition.listIndex === listIndex &&
        hoveredPosition.cardIndex === card.length &&
        isMouseBelowLastCard && (
          <div
            className="slot-placeholder"
            onDragOver={onDragOver}
            onDragEnter={(e) => onDragEnter(e, listIndex, card.length)}
          ></div>
        )}
    </div>
  );
}
