import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  total: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {

      const item = state.items.find(item => item.id === action.payload.id);

      if (item && ((item.size === action.payload.size) && (item.type === action.payload.type))) {
        let index = state.items.findIndex(item1 => item1.id === action.payload.id);
        state.items[index].count++
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.total = state.items.reduce((sum, item) => {
        return (item.price * item.count) + sum
      }, 0);

    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearItem: (state, action) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;