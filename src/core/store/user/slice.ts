/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@/core/config/endpoints';
import axios from '@/core/services/api/axios';
import fetchAccount from '@/core/services/fetch-account';
import { Profile } from '@/core/typings/profile';
import getUserFromLS from '@/core/utils/get-user-from-ls';
import setUserToLS from '@/core/utils/set-user-to-ls';

import { EditProfile } from '../profiles/types';

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

export const editProfile = createAsyncThunk(
  'profiles/editProfile',
  async (payload: EditProfile, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(API_ENDPOINTS.account, payload);

      return data;
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
        toast.success('Your account was successfully created');
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
        toast.error(action.payload as string);
      })
      .addCase(editProfile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload;
        state.error = null;
        setUserToLS(action.payload);
        toast.success('Your profile was successfully updated');
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
        toast.error(action.payload as string);
      });
  },
});

export const { logout, clearError } = userSlice.actions;

export default userSlice.reducer;
