import React from "react";
import "../Column/column.css";
interface IList {
  title: string;
  card: any;
}
export default function Column({ title, card }: IList) {
  return (
    <div className="column">
      <p className="column__title">{title}</p>
      {/* {card.map((item: any) => (
        <div className="column__card">{item.title}</div>
      ))} */}
    </div>
  );
}
