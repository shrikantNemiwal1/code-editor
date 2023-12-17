import Chevron from "../assets/icons/chevron.svg?react";
import "./css/dropdown.css";

const DropDown = ({ options, value, onChange }) => {
  return (
    <div className="dropdown-container">
      <button className="dropdown-btn" id="dropdown-btn">
        <span className="dropdown-selected">
          <span>{value}</span>
          <span className="dropdown-icon">
            <Chevron />
          </span>
        </span>
      </button>
      <ul className="dropdown-options">
        {options.map((item) => {
          return (
            <li key={item}>
              <button
                className={value === item ? "dropdown-option--active" : ""}
                onClick={() => onChange(item)}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDown;
