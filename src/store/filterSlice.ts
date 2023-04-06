import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ISortItem {
  type: string,
  name?: string,
  order: string
}

export interface IActiveSort extends ISortItem {
  id: number,
}

interface IFilterState {
  sorts: ISortItem[],
  activeSort: IActiveSort,
  categories: string[],
  activeCategory: number,
  activePage: number,
  searchQuery: string
}

export interface ISetFilters {
  category: number,
  page: number,
  searchQuery: string,
  sortId: number,
  sortType: string,
  sortOrder: string
}

const initialState: IFilterState = {
  sorts: [
    { type: 'rating', name: 'популярности', order: "asc" },
    { type: 'price', name: 'цене', order: "asc" },
    { type: 'name', name: 'алфавиту', order: "asc" }
  ],
  activeSort: { id: 0, type: 'rating', order: "asc" },
  categories: ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'],
  activeCategory: 0,
  activePage: 1,
  searchQuery: ''
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<IActiveSort>) => {
      state.activeSort = action.payload;
      state.sorts[state.activeSort.id].order = state.activeSort.order;
    },
    changeCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<ISetFilters>) => {
      state.activePage = Number(action.payload.page);
      state.activeCategory = Number(action.payload.category);
      state.activeSort = {
        id: action.payload.sortId,
        type: action.payload.sortType,
        order: action.payload.sortOrder
      };
      state.sorts[action.payload.sortId].order = action.payload.sortOrder;
      state.searchQuery = action.payload.searchQuery
    }
  }
});

export const { changeSort, changeCategory, changePage, changeSearchQuery, setFilters } = filterSlice.actions;
export default filterSlice.reducer;