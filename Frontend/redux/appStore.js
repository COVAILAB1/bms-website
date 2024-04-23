import { configureStore } from "@reduxjs/toolkit";
import bmsData from "./dataSlice";

const appStore = configureStore({
  reducer: {
    bmsData: bmsData,
  },
});

export default appStore;
