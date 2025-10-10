import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    setRequest: (state, action) => {
      return action.payload;
    },
    addRequest: (state, action) => {
      state.push(action.payload);
    },
    removeRequest: (state, action) =>
      state.filter((req) => req._id !== action.payload),
  },
});

export const { setRequest, addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
