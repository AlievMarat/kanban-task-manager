import React from "react";
import "./createFirstColumn.css";
export default function CreateFirstColumn() {
  return (
    <div className="first-column-create">
      This board is empty. Create a new column to get started.
      <button className="first-column-create__btn">+ Add New Column</button>
    </div>
  );
}
