import "./css/modal.css";
import CloseIcon from "../assets/icons/close.svg?react";
import { useState } from "react";

const Modal = ({ children, setOpen, open }) => {
  const modalClick = (e) => {
    e.stopPropagation();
    console.log("modal");
  };
  return (
    <section
      className={`modal-container ${open ? "modal-container--open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <div
        className={`modal ${open ? "modal--open" : ""}`}
        onClick={modalClick}
      >
        <span className="modal-name">Settings</span>
        <button className="close-btn" onClick={() => setOpen(!open)}>
          <CloseIcon width="16px" className="navbar-icon" />
        </button>
        {children}
      </div>
    </section>
  );
};

export default Modal;
