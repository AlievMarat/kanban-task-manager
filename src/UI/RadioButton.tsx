import React from "react";
import IconLightTheme from "../assets/IconLightTheme.svg";
import IconDarkTheme from "../assets/IconDarkTheme.svg";
import "./radioButton.css";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../store/slices/setDarkTheme";
import { useTypedSelector } from "../customHooks/useTypedSelector";
export default function RadioButton() {
  const dispatch = useDispatch();
  const currentTheme = useTypedSelector((state) => state.themeSlice.theme);
  return (
    <div className="radio-button-container">
      <img
        className="radio__img"
        onClick={() => dispatch(toggleTheme())}
        src={IconLightTheme}
      />
      <div
        className={
          currentTheme === "dark" ? "radio-button-left" : "radio-button-right"
        }
      >
        <div
          className="radio-item"
          onClick={() => dispatch(toggleTheme())}
        ></div>
      </div>
      <img
        className="radio__img"
        onClick={() => dispatch(toggleTheme())}
        src={IconDarkTheme}
      />
    </div>
  );
}
