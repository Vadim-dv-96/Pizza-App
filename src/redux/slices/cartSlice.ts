import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartState = typeof initialState;
export type ItemType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

const initialState = {
  items: [] as ItemType[],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemType>) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
    },
    minusItem: (state, action: PayloadAction<{ id: number }>) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },
    removeItem: (state, action: PayloadAction<{ id: number; price: number; count: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice = state.totalPrice - action.payload.count * action.payload.price;
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, clearItems, minusItem, removeItem } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
