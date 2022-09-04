import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'],
  activeCategory: 0,
}

export const categorySlice = createSlice({
  name: 'change_category',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.activeCategory = action.payload;
    }
  }
})

export const { changeCategory } = categorySlice.actions;
export default categorySlice.reducer;