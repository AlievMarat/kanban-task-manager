import React from "react";
import Button from "../UI/Button";
import "./header.css";
import iconVerticalEllipsis from "../assets/iconVerticalEllipsis.svg";
import logoLight from "../assets/logoLight.svg";
export default function Header() {
  return (
    <header className="header">
      <img src={logoLight} className="logo" alt="Logo" />
      <div className="header__info">
        <h1 className="header__title">Platform Launch</h1>

        <div className="header__create-board">
          <Button title="+ Add New Task" onClick={() => null} />
          <img src={iconVerticalEllipsis} />
        </div>
      </div>
    </header>
  );
}
