import { useState } from "react";
import "./css/tooltip.css";

export default function TooltipClick(props) {
  const { text, children, value } = props;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const showTooltip = () => {
    console.log("click");
    if (value) navigator.clipboard.writeText(value);
    setIsTooltipVisible(true);
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 1000);
  };
  return (
    <div className="tooltip" onClick={showTooltip}>
      {children}
      <span
        className={`tooltiptext ${
          isTooltipVisible ? "tooltiptext--visible" : ""
        }`}
      >
        {text}
      </span>
    </div>
  );
}
