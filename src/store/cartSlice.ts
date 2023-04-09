import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import reduceBy from '../utils/reduceBy';

export interface ICartProduct {
  id: string,
  name: string,
  price: number,
  imageUrl: string,
  size: number,
  type: number
  count: number
}

interface ICartState {
  totalPrice: number,
  totalCount: number,
  items: ICartProduct[]
}

const items: ICartProduct[] = JSON.parse(localStorage.getItem("cart") as string) || [];
const totalPrice = reduceBy<ICartProduct>(items, (item) => item.price * item.count);
const totalCount = reduceBy<ICartProduct>(items, (item) => item.count);

const initialState: ICartState = {
  totalPrice,
  totalCount,
  items
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartProduct>) => {

      const item = state.items.find(item => item.id === action.payload.id);

      if (item && ((item.size === action.payload.size) && (item.type === action.payload.type))) {
        item.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = reduceBy<ICartProduct>(state.items, (item) => item.price * item.count);
      state.totalCount = reduceBy<ICartProduct>(state.items, (item) => item.count);

    },
    subtractItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      
      if (item) {
        item.count--;
      }

      state.totalPrice = reduceBy<ICartProduct>(state.items, (item) => item.price * item.count);
      state.totalCount = reduceBy<ICartProduct>(state.items, (item) => item.count);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      state.totalPrice = reduceBy<ICartProduct>(state.items, (item) => item.price * item.count);
      state.totalCount = reduceBy<ICartProduct>(state.items, (item) => item.count);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    }
  }
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(item => item.id === id);

export const { addItem, removeItem, clearCart, subtractItem } = cartSlice.actions;
export default cartSlice.reducer;