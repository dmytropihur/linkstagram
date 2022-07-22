import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import profiles from './profiles/slice';
import user from './user/slice';

export const store = configureStore({
  reducer: {
    user,
    profiles,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
