import { useState } from "react";
import DropDown from "./DropDown";
import "./css/settings.css";

const Settings = ({ fontSize, setFontSize }) => {
  return (
    <div className="settings-container">
      <ul className="settings-list">
        <li className="settings-item">
          <div>Font size</div>
          <DropDown
            options={[10, 12, 14, 16, 18, 20]}
            value={fontSize}
            onChange={(data) => setFontSize(data)}
          />
        </li>
        <li className="settings-item">
          <div>Font size</div>
          <DropDown
            options={["one", "two"]}
            value={fontSize}
            onChange={(data) => setFontSize(data)}
          />
        </li>
        <li className="settings-item">
          <div>Font size</div>
          <DropDown
            options={["one", "two"]}
            value={fontSize}
            onChange={(data) => setFontSize(data)}
          />
        </li>
      </ul>
    </div>
  );
};

export default Settings;
