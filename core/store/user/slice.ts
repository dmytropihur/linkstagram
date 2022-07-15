/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import BASE_API_URL from '../../config/constants';
import fetchAccount from '../../utils/fetchAccount';
import getUserFromLS from '../../utils/getUserFromLS';

import { AuthProps, User, UserSliceState } from './types';

const initialState: UserSliceState = getUserFromLS();

export const login = createAsyncThunk(
  'user/login',
  async (props: AuthProps, { rejectWithValue }) => {
    try {
      const { headers } = await axios.post(`${BASE_API_URL}/login`, props);

      localStorage.setItem('token', headers.authorization);

      return fetchAccount(headers.authorization);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const error = JSON.parse(err?.request?.response);

        return rejectWithValue(error['field-error'][1]);
      }

      return rejectWithValue('Error');
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (props: AuthProps, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_API_URL}/create-account`, props);

      return res;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const error = JSON.parse(err?.request?.response);

        return rejectWithValue(error['field-error'][1]);
      }

      return rejectWithValue('Error');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.user = {} as User;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'fulfilled';
        state.user = action.payload;
        state.loginError = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.status = 'rejected';
      })
      .addCase(register.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(register.fulfilled, (state) => {
        state.registerError = '';
        state.loginError = '';
        state.status = 'fulfilled';
      })
      .addCase(register.rejected, (state, action) => {
        state.registerError = action.payload as string;
        state.status = 'rejected';
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
