// store.js
import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "../features/code/codeSlice";
// import thunk from "redux-thunk/dist/redux-thunk.cjs";

// Load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("codeData");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

// Save state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("codeData", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

const store = configureStore({
  reducer: {
    code: codeReducer,
  },
  preloadedState: loadStateFromLocalStorage(), // Initialize with data from localStorage
  //   middleware: [thunk],
});

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
