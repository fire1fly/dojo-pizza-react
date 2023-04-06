import { configureStore } from "@reduxjs/toolkit";
import filter from "./filterSlice";
import cart from "./cartSlice";
import products from "./productsSlice";
import { useDispatch } from "react-redux";


export const store = configureStore({
  reducer: {
    filter,
    products,
    cart,
  }
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

