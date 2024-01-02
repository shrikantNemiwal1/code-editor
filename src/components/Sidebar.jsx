import "./css/sidebar.css";

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
        {children}
      </div>
    </section>
  );
};

export default Sidebar;
