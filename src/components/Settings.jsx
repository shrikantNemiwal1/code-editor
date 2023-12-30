import { useState } from "react";
import DropDown from "./DropDown";
import "./css/settings.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFontSize,
  updateTabSize,
  updateTheme,
} from "../redux/settings/settingsSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state?.settings);
  return (
    <div className="settings-container">
      <ul className="settings-list">
        <li className="settings-item">
          <div>Font size</div>
          <DropDown
            options={[10, 12, 14, 16, 18, 20]}
            value={settings?.fontSize || 14}
            onChange={(data) => dispatch(updateFontSize(data))}
          />
        </li>
        <li className="settings-item">
          <div>Tab space</div>
          <DropDown
            options={[2, 4, 6, 8]}
            value={settings?.tabSize}
            onChange={(data) => dispatch(updateTabSize(data))}
          />
        </li>
        <li className="settings-item">
          <div>Editor Theme</div>
          <DropDown
            options={[
              "vscode",
              "xcode",
              "material",
              "basic",
              "duotone",
              "github",
              "solarized",
            ]}
            value={settings?.theme}
            onChange={(data) => dispatch(updateTheme(data))}
          />
        </li>
      </ul>
    </div>
  );
};

export default Settings;
