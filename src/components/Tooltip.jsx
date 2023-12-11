import "./css/tooltip.css";

export default function Tooltip(props) {
  const { text, children } = props;

  return (
    <div className="tooltip">
      {children}
      <span className={"tooltiptext tooltiptext--hover "}>{text}</span>
    </div>
  );
}
