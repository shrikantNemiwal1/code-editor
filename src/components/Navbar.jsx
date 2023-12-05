import "./css/navbar.css";
import FolderIcon from "../assets/icons/folder.svg?react";
import SettingIcon from "../assets/icons/setting.svg?react";
import DropDown from "./DropDown";
import { useState } from "react";
const languages = ["Python", "C++", "JavaScript", "Java", "Go"];
const Navbar = () => {
  const [language, setLanguage] = useState(languages[0]);
  return (
    <nav className="navbar">
      <DropDown options={languages} value={language} onChange={setLanguage} />
      <button className="navbar-btn">
        <SettingIcon className="navbar-icon" />
      </button>
      <button className="navbar-btn">
        <FolderIcon className="navbar-icon--2" />
      </button>
    </nav>
  );
};

export default Navbar;
