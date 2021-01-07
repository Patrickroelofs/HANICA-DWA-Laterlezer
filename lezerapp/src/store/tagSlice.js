import { createSlice } from '@reduxjs/toolkit';
import axios, { post, put } from 'axios';
import { getArticles } from './articleSlice';

const API_URL = 'http://localhost:3000/api';

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    selectedTags: [],
    articleTags: [],
  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setArticleTags: (state, action) => {
      state.articleTags = action.payload;
    },
    selectTag: (state, action) => {
      const childrenIds = (tag) => tag.children.map((t) => [t._id, ...childrenIds(t)]).flat();
      function flatDeep(arr) {
        return arr.reduce((acc, val) => acc.concat(val.children.length > 0 ? [...flatDeep(val.children), val] : [val]), []);
      }
      const parentsTags = (tag) => flatDeep(state.tags, Infinity).filter((t) => (childrenIds(t).includes(tag._id)));
      const parentTags = parentsTags(action.payload);
      state.selectedTags = [action.payload, ...parentTags];
    },
  },
});

export const selectTags = (state) => state.tag.tags;
export const selectSelectedTags = (state) => state.tag.selectedTags;

export const {
  setTags, setSelectedTags, setArticleTags, selectTag,
} = tagSlice.actions;
export default tagSlice.reducer;

export const updateTag = (tag) => (dispatch) => put(`${API_URL}/tags`, tag)
  .then(({ data, status }) => {
    dispatch(setTags(data.data));
    dispatch(getArticles());
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

export const createTag = (title, color, parent) => (dispatch) => post(`${API_URL}/tags`, { tag: { title, color }, parent })
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

export const deleteTag = (tag) => (dispatch) => axios.delete(`${API_URL}/tags`, { data: { tag } })
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
