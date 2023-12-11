// codeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const codeSlice = createSlice({
  name: 'code',
  initialState: {
    codeData: {},
  },
  reducers: {
    saveCodeData: (state, action) => {
      state.codeData = action.payload;
    },
  },
});

export const { saveCodeData } = codeSlice.actions;
export default codeSlice.reducer;
