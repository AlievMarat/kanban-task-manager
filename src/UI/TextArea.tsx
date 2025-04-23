import React from "react";
import "./textArea.css";
interface ITextArea {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function TextArea({ value, placeholder, onChange }: ITextArea) {
  return (
    <textarea
      className="description"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
