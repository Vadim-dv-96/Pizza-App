import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValueSortType } from '../../components/Sort';

export type FilterState = typeof initialState;

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeCategoryPizza: (state, action: PayloadAction<{ categryId: number }>) => {
      state.categoryId = action.payload.categryId;
    },
    setSort: (state, action: PayloadAction<{ typeSort: ValueSortType }>) => {
      state.sort = action.payload.typeSort;
    },
    changePage: (state, action: PayloadAction<{ page: number }>) => {
      state.currentPage = action.payload.page;
    },
    setFiltersFromQuerySearch: (state, action: PayloadAction<FilterState>) => {
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort;
    },
  },
});

export const { changeCategoryPizza, setSort, changePage, setFiltersFromQuerySearch } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
