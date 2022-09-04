import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sorts: [
    { type: 'rating', name: 'популярности', order: "asc" },
    { type: 'price', name: 'цене', order: "asc" },
    { type: 'name', name: 'алфавиту', order: "asc" }
  ],
  activeSort: { id: 0, type: 'rating', order: "asc" },
}

export const sortSlice = createSlice({
  name: 'change_sort',
  initialState,
  reducers: {
    changeSort: (state, action) => {
      state.activeSort = action.payload;
      state.sorts[state.activeSort.id].order = state.activeSort.order;
    },
  }
})

export const { changeSort } = sortSlice.actions;
export default sortSlice.reducer;

console.log(sortSlice);