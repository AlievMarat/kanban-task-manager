import "./style.css";
interface IButton {
  title: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties | undefined;
  disabled?: boolean;
}

export default function Button({
  title,
  onClick,
  className,
  style,
  disabled,
}: IButton) {
  return (
    <button
      className={`button ${className || ""}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
