import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './slices/filterSlice';

const rootReducer = combineReducers({
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof store.getState>;

// типизация хука dispatch в папке redux-hooks
export type AppDispatch = typeof store.dispatch;
