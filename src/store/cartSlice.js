import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {

      const item = state.items.find(item => item.id === action.payload.id);

      if (item && ((item.size === action.payload.size) && (item.type === action.payload.type))) {
        item.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return (item.price * item.count) + sum
      }, 0);

      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0);

    },
    subtractItem: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      item.count--;

      state.totalPrice = state.items.reduce((sum, item) => {
        return (item.price * item.count) + sum
      }, 0);

      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, item) => {
        return (item.price * item.count) + sum
      }, 0);

      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    }
  }
});

export const selectCart = state => state.cart;
export const selectCartItemById = id => state => state.cart.items.find(item => item.id === id)

export const { addItem, removeItem, clearCart, subtractItem } = cartSlice.actions;
export default cartSlice.reducer;