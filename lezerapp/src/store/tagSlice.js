import { createSlice } from '@reduxjs/toolkit';
import { post } from 'axios';

const API_URL = 'http://localhost:3000/api';

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    selectedTags: [],
  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },

  },
});

export const selectTags = (state) => state.tag.tags;
export const selectSelectedTags = (state) => state.tag.selectedTags;

export const { setTags, setSelectedTags } = tagSlice.actions;
export default tagSlice.reducer;

export const createTag = (title, color) => (dispatch) => post(`${API_URL}/tags`, { tags: [{ title, color }] })
  .then(({ data, status }) => {
    dispatch(setTags(data.data));
    return {
      status,
      message: data.message,
      success: data.success,
    };
  }).catch(({ response }) => ({
    status: response.status,
    message: response.data.message,
    success: response.data.success,
  }));
