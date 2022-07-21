/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { API_ENDPOINTS } from '@/core/config/endpoints';
import axios from '@/core/services/api/axios';

import { Profile } from '../types';

import { ProfilesSliceState } from './types';

const initialState: ProfilesSliceState = {
  error: null,
  status: 'idle',
  profiles: [],
  profile: null,
};

export const fetchProfiles = createAsyncThunk(
  'profiles/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.profiles);

      console.log(data);

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

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.profiles = action.payload as unknown as Profile[];
        state.error = null;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
      });
  },
});

export const { clearError } = profilesSlice.actions;

export default profilesSlice.reducer;
