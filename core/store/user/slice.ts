import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_API_URL } from '../../config/constants';
import fetchAccount from '../../utils/fetchAccount';
import getUserFromLS from '../../utils/getUserFromLS';

import { LoginProps, RegisterProps, User, UserSliceState } from './types';

const initialState: UserSliceState = getUserFromLS();

export const login = createAsyncThunk(
  'user/login',
  async (props: LoginProps, { rejectWithValue }) => {
    try {
      const { headers } = await axios.post(`${BASE_API_URL}/login`, props);

      localStorage.setItem('token', headers.authorization);

      return fetchAccount(headers.authorization);
    } catch {
      return rejectWithValue('Error');
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (props: RegisterProps, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_API_URL}/create-account`, props);

      return res;
    } catch {
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
      // eslint-disable-next-line no-param-reassign
      state.user = {} as User;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'fulfilled';
        // eslint-disable-next-line no-param-reassign
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'rejected';
      })
      .addCase(register.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'pending';
      })
      .addCase(register.fulfilled, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'fulfilled';
      })
      .addCase(register.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'rejected';
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
