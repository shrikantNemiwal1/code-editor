import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    fontSize: 14,
    tabSize: 2,
    theme: "vscode",
    language: "C++",
  },
  reducers: {
    updateFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    updateTabSize: (state, action) => {
      state.tabSize = action.payload;
    },
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { updateFontSize, updateTabSize, updateTheme, updateLanguage } =
  settingsSlice.actions;
export default settingsSlice.reducer;
