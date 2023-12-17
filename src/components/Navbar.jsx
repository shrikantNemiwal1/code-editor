import "./css/navbar.css";
import FolderIcon from "../assets/icons/folder.svg?react";
import SettingIcon from "../assets/icons/setting.svg?react";
import DropDown from "./DropDown";
import logo from "../assets/icons/logo.png";
import PlayIcon from "../assets/icons/play.svg?react";
import StopIcon from "../assets/icons/stop.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
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
const Navbar = ({
  language,
  setLanguage,
  handleRunCode,
  isLoading,
  modalOpen,
  sidebarOpen,
  isLightMode,
  toggleDarkMode,
}) => {
  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className="title">CODE EDITOR</div>
      <DropDown options={languages} value={language} onChange={setLanguage} />
      <button className="navbar-btn" onClick={toggleDarkMode}>
        {!isLightMode ? <SunIcon /> : <MoonIcon className="navbar-icon--2" />}
      </button>
      <button className="navbar-btn" onClick={modalOpen}>
        <SettingIcon className="navbar-icon" />
      </button>
      <button className="navbar-btn" onClick={sidebarOpen}>
        <FolderIcon className="navbar-icon--2" />
      </button>
      <button
        onClick={handleRunCode}
        className={`run-btn ${isLoading ? "run-btn--gray" : ""}`}
      >
        <span>{isLoading ? "Stop" : "Run"}</span>
        {isLoading ? <StopIcon /> : <PlayIcon />}
      </button>
    </nav>
  );
};

export default Navbar;
