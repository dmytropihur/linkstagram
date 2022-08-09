/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { API_ENDPOINTS } from '@/core/config/endpoints';
import axios from '@/core/services/api/axios';

import { PostsSliceState } from './types';

const initialState: PostsSliceState = {
  error: null,
  status: 'idle',
  posts: [],
  totalQuantity: 0,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.posts}/?page=${page}`);

      return {
        data: response.data,
        total: response.headers.total,
      };
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const error = JSON.parse(err?.request?.response);

        return rejectWithValue(error['field-error'][1]);
      }

      return rejectWithValue('Error');
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.posts?.push(...action.payload.data);
        state.error = null;
        state.totalQuantity = +action.payload.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
      });
  },
});

export const { clearError } = postsSlice.actions;

export default postsSlice.reducer;
