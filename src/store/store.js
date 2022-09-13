import { configureStore } from "@reduxjs/toolkit";
import category from "./categorySlice";
import sort from "./sortSlice";


export const store = configureStore({
  reducer: {
    category,
    sort
  }
});

