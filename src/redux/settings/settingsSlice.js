import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    fontSize: 14,
    tabSize: 2,
    theme: "vscode",
    language: "C++",
    runCodeShortcutEnabled: true,
    formatCodeShortcutEnabled: true,
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
    toggleRunCodeShortcut: (state) => {
      state.runCodeShortcutEnabled = !state.runCodeShortcutEnabled;
    },
    toggleFormatCodeShortcut: (state) => {
      state.formatCodeShortcutEnabled = !state.formatCodeShortcutEnabled;
    },
  },
});

export const {
  updateFontSize,
  updateTabSize,
  updateTheme,
  updateLanguage,
  toggleRunCodeShortcut,
  toggleFormatCodeShortcut,
} = settingsSlice.actions;
export default settingsSlice.reducer;
