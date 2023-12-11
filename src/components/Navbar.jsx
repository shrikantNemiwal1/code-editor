import "./css/navbar.css";
import FolderIcon from "../assets/icons/folder.svg?react";
import SettingIcon from "../assets/icons/setting.svg?react";
import DropDown from "./DropDown";
import logo from "../assets/icons/logo.png";
const languages = [
  "C++",
  "Python",
  "Java",
  "C",
  "C#",
  "JavaScript",
  "Ruby",
  "Go",
  "Kotlin",
];
const Navbar = ({ language, setLanguage }) => {
  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className="title" >CODE EDITOR</div>
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
