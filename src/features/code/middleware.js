// middleware.js
import { saveCodeData } from "./codeSlice";

export const saveCodeDataToLocalStorage = (data) => {
  return (dispatch) => {
    try {
      // Save data to localStorage
      localStorage.setItem("codeCodeData", JSON.stringify(data));

      // Dispatch the regular action to update the Redux store
      dispatch(saveCodeData(data));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };
};
