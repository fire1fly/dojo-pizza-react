import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sorts: [
    { type: 'rating', name: 'популярности', order: "asc" },
    { type: 'price', name: 'цене', order: "asc" },
    { type: 'name', name: 'алфавиту', order: "asc" }
  ],
  activeSort: { id: 0, type: 'rating', order: "asc" },
  categories: ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'],
  activeCategory: 0,
  activePage: 1
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeSort: (state, action) => {
      state.activeSort = action.payload;
      state.sorts[state.activeSort.id].order = state.activeSort.order;
    },
    changeCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    changePage: (state, action) => {
      state.activePage = action.payload;
    },
    setFilters: (state, action) => {
      state.activePage = Number(action.payload.page);
      state.activeCategory = Number(action.payload.category);
      state.activeSort = {
        id: Number(action.payload.orderId),
        type: action.payload.sortBy,
        order: action.payload.order
      };
      state.sorts[action.payload.orderId].order = action.payload.order;
    }
  }
});

export const { changeSort, changeCategory, changePage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;