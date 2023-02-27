import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValueSortType } from '../../components/Sort';

export type FilterState = typeof initialState;

const initialState = {
  categoryId: 0,
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
  },
  extraReducers(builder) {},
});

export const { changeCategoryPizza, setSort } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
