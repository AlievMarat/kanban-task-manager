import React from "react";
interface IList {
  title: string;
  card: any;
}
export default function List({ title, card }: IList) {
  return (
    <div className="list">
      <p className="list__title">{title}</p>
      {card.map((item: any) => (
        <div className="list__card">{item.title}</div>
      ))}
    </div>
  );
}
