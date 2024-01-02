import "./css/toggleswitch.css";

const ToggleSwitch = ({ value, onChange }) => {
  return (
    <div
      className={`toggle-switch ${value ? "toggle-switch--on" : ""}`}
      onClick={onChange}
    >
      <span className={`toggle-icon ${value ? "toggle-icon--on" : ""}`}></span>
    </div>
  );
};

export default ToggleSwitch;
