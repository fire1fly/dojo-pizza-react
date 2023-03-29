import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ activePage, sortType, sortOrder, category, search }) => {
    const { data } = await axios.get(
      `https://62f4edb1ac59075124c73e43.mockapi.io/products?p=${activePage}&l=10&sortBy=${sortType}&order=${sortOrder}${category}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading'
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading"
      state.items = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded"
    },
    [fetchProducts.rejected]: (state) => {
      state.status = "error";
    },
  }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;