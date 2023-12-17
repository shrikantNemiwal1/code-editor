import { useRef, useState } from "react";
import "./css/splitpane.css";
import SeparatorIcon from "../assets/icons/separator-dots.svg?react";
import SeparatorIconVertical from "../assets/icons/separator-dots-vertical.svg?react";

export default function SplitPane({ children }) {
  const [paneWidth, setPaneWidth] = useState(500);
  const splitPaneRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (e.clientX > 300 && e.clientX < splitPaneRef?.current?.offsetWidth - 300)
      setPaneWidth(e.clientX - 12);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <section className="split-pane" ref={splitPaneRef}>
      <div style={{ display: "flex", height: "calc(100% - 5rem)" }}>
        <div
          style={{
            flex: `0 0 ${paneWidth}px`,
          }}
        >
          {children[0]}
        </div>
        <div className="split-pane-separator" onMouseDown={handleMouseDown}>
          <SeparatorIconVertical className="split-pane-separator-icon" />
        </div>
        <div
          style={{
            flex: "1",
            overflow: "auto",
          }}
        >
          {children[1]}
        </div>
      </div>
    </section>
  );
}

SplitPane.Vertical = function SplitPane({ children }) {
  const [paneHeight1, setPaneHeight1] = useState(230);
  const [paneHeight2, setPaneHeight2] = useState(230);
  const splitPaneRef = useRef(null);

  const handleMouseDown1 = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove1);
    document.addEventListener("mouseup", handleMouseUp1);
  };

  const handleMouseDown2 = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove2);
    document.addEventListener("mouseup", handleMouseUp2);
  };

  const handleMouseMove1 = (e) => {
    if (e.clientY - 62 > 33) setPaneHeight1(e.clientY - 62);
  };

  const handleMouseMove2 = (e) => {
    if (
      e.clientY - paneHeight1 - 72 > 33 &&
      e.clientY < splitPaneRef.current?.offsetHeight - 30
    )
      setPaneHeight2(e.clientY - paneHeight1 - 72);
  };

  const handleMouseUp1 = () => {
    document.removeEventListener("mousemove", handleMouseMove1);
    document.removeEventListener("mouseup", handleMouseUp1);
  };

  const handleMouseUp2 = () => {
    document.removeEventListener("mousemove", handleMouseMove2);
    document.removeEventListener("mouseup", handleMouseUp2);
  };

  return (
    <section className="split-pane split-pane--vertical" ref={splitPaneRef}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            flex: `0 0 ${paneHeight1}px`,
            overflow: "hidden",
            borderRadius: "5px",
          }}
        >
          {children[0]}
        </div>
        <div
          className="split-pane-separator--vertical"
          onMouseDown={handleMouseDown1}
        >
          <SeparatorIcon className="split-pane-separator-icon" />
        </div>
        <div
          style={{
            flex: `0 0 ${paneHeight2}px`,
            overflow: "hidden",
            borderRadius: "5px",
          }}
        >
          {children[1]}
        </div>
        <div
          className="split-pane-separator--vertical"
          onMouseDown={handleMouseDown2}
        >
          <SeparatorIcon className="split-pane-separator-icon" />
        </div>
        <div
          style={{
            flex: "1",
            overflow: "hidden",
            borderRadius: "5px",
          }}
        >
          {children[2]}
        </div>
      </div>
    </section>
  );
};
