import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import sortSlice from "./sortSlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    sort: sortSlice
  }
});