import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "BMS",
  initialState: {
    data: {},
  },
  reducers: {
    setData: (state, action) => {
      return { data: action.payload };
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;