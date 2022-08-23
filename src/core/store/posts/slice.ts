/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { API_ENDPOINTS } from '@/core/config/endpoints';
import axios from '@/core/services/api/axios';
import { NewPost } from '@/core/typings/post';

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
        page,
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

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post: NewPost, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.posts}`, post);

      return response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const error = JSON.parse(err?.request?.response);

        return rejectWithValue(error['field-error'][1]);
      }

      return rejectWithValue('Error');
    }
  },
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_ENDPOINTS.posts}/${id}`);

      return id;
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
        state.error = null;
        state.totalQuantity = +action.payload.total;

        if (action.payload.page === 1) {
          state.posts = action.payload.data;
        }

        if (action.payload.page !== 1) {
          state.posts?.push(...action.payload.data);
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
      })
      .addCase(createPost.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
      })
      .addCase(deletePost.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'rejected';
      });
  },
});

export const { clearError } = postsSlice.actions;

export default postsSlice.reducer;
