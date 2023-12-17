import "./css/sidebar.css";
import CloseIcon from "../assets/icons/close.svg?react";

const Sidebar = ({ children, setOpen, open }) => {
  const sidebarClick = (e) => {
    e.stopPropagation();
    console.log("sidebar");
  };
  return (
    <section
      className={`sidebar-container ${open ? "sidebar-container--open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <div
        className={`sidebar ${open ? "sidebar--open" : ""}`}
        onClick={sidebarClick}
      >
        {/* <span className="sidebar-name">Settings</span>
        <button className="close-btn" onClick={() => setOpen(!open)}>
          <CloseIcon width="16px" className="navbar-icon" />
        </button> */}
        {children}
      </div>
    </section>
  );
};

export default Sidebar;
