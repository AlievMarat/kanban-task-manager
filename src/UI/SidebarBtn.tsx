import React from "react";
interface IButton {
  title: string;
  onClick: () => void;
  img: string;
  styles?: object;
}
export default function SidebarBtn({ title, onClick, img, styles }: IButton) {
  return (
    <button className="sidebar-btn" onClick={onClick} style={styles}>
      <img className="sidebar-btn__img" src={img} />
      {title}
    </button>
  );
}
