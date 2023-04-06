import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk<IProduct[], Record<string, string>>(
  'products/fetchProducts',
  async ({ activePage, sortType, sortOrder, category, search }) => {
    const { data } = await axios.get<IProduct[]>(
      `https://62f4edb1ac59075124c73e43.mockapi.io/products?p=${activePage}&l=10&sortBy=${sortType}&order=${sortOrder}${category}${search}`
    );
    return data;
  }
);

export interface IProduct {
  id: number,
  name: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[]
}

export enum ProductsStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface IProductsState {
  status: ProductsStatus,
  items: IProduct[]
}

const initialState: IProductsState = {
  items: [],
  status: ProductsStatus.LOADING
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = ProductsStatus.LOADING;
      state.items = [];
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = ProductsStatus.SUCCESS;
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = ProductsStatus.ERROR;
    });
  }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;