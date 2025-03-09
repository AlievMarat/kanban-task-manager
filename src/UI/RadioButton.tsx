import React from "react";
import IconLightTheme from "../assets/IconLightTheme.svg";
import IconDarkTheme from "../assets/IconDarkTheme.svg";
import "./radioButton.css";
export default function RadioButton() {
  const [radioPosition, setRadioPosition] = React.useState(false);
  return (
    <div className="radio-button-container">
      <img
        className="radio__img"
        onClick={() => setRadioPosition(true)}
        src={IconLightTheme}
      />
      <div
        className={
          radioPosition === false ? "radio-button-left" : "radio-button-right"
        }
      >
        <div
          className="radio-item"
          onClick={() => setRadioPosition(!radioPosition)}
        ></div>
      </div>
      <img
        className="radio__img"
        onClick={() => setRadioPosition(false)}
        src={IconDarkTheme}
      />
    </div>
  );
}
