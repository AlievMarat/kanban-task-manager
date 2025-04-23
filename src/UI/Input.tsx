import React from "react";
import IconCross from "../assets/IconCross.svg";
import "./input.css";
interface Input {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  children?: React.ReactNode;
}
export default function Input({
  placeholder,
  onChange,
  value,
  children,
}: Input) {
  return (
    <div className="input-container">
      <input
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {children}
    </div>
  );
}
