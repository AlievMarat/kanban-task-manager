import React from "react";
import "./style.css";
interface IButton {
  title: string;
  onClick: () => void;
}
export default function Button({ title, onClick }: IButton) {
  return (
    <button className="button" onClick={onClick}>
      {title}
    </button>
  );
}
