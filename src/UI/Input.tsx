import React from "react";
interface Input {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
export default function Input({ placeholder, onChange, value }: Input) {
  return (
    <input
      className="input"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
