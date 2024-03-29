import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cartSlice';
import { filterReducer } from './slices/filterSlice';

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof store.getState>;

// типизация хука dispatch в папке redux-hooks
export type AppDispatch = typeof store.dispatch;
