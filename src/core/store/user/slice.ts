/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { API_ENDPOINTS } from '@/core/config/endpoints';
import axios from '@/core/services/api/axios';
import fetchAccount from '@/core/services/fetch-account';
import { Profile } from '@/core/typings/profile';
import getUserFromLS from '@/core/utils/get-user-from-ls';

import { AuthProps, UserSliceState } from './types';

const initialState: UserSliceState = getUserFromLS();

export const login = createAsyncThunk(
  'user/login',
  async (props: AuthProps, { rejectWithValue }) => {
    try {
      const { headers } = await axios.post(API_ENDPOINTS.login, props);

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
      const res = await axios.post(API_ENDPOINTS.register, props);

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
      state.user = null;
      state.status = 'idle';
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.status = 'fulfilled';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
      })
      .addCase(register.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(register.fulfilled, (state) => {
        state.error = null;
        state.status = 'fulfilled';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
      });
  },
});

export const { logout, clearError } = userSlice.actions;

export default userSlice.reducer;
