import React from "react";
import "./menuButton.css";
interface IMenu {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
}
export default function MenuButton({ title, onEdit, onDelete }: IMenu) {
  return (
    <div className="menu">
      <div className="menu__item" onClick={onEdit}>
        Edit {title}
      </div>
      <div className="menu__item" onClick={onDelete}>
        Delete {title}
      </div>
    </div>
  );
}
