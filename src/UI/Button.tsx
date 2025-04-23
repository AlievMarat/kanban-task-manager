import "./style.css";
interface IButton {
  title: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties | undefined;
}

export default function Button({ title, onClick, className, style }: IButton) {
  return (
    <button
      className={`button ${className || ""}`}
      onClick={onClick}
      style={style}
    >
      {title}
    </button>
  );
}
