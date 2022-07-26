/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { API_ENDPOINTS } from '@/core/config/endpoints';
import axios from '@/core/services/api/axios';
import { Post } from '@/core/typings/post';

import { PostsSliceState } from './types';

const initialState: PostsSliceState = {
  error: null,
  status: 'idle',
  posts: [],
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.posts);

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
        state.posts = action.payload as unknown as Post[];
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
      });
  },
});

export const { clearError } = postsSlice.actions;

export default postsSlice.reducer;
