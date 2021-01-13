import { createSlice } from '@reduxjs/toolkit';
import axios, { post, put } from 'axios';
import { getArticles } from './articleSlice';
import TopDown from './Classes/TopDown';
import DownTop from './Classes/DownTop';

const API_URL = 'http://localhost:3000/api';

const modeParser = (state) => (state.mode === 'TopDown' ? new TopDown(state.tags, state.selectedTags) : new DownTop(state.tags, state.selectedTags));

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    mode: new TopDown(),
    selectedTags: [],
    articleTags: [],
  },
  reducers: {
    toggleMode: (state) => {
      if (state.mode === 'TopDown') {
        state.mode = 'DownTop';
      } else {
        state.mode = 'TopDown';
      }
    },
    setTags: (state, action) => {
      const tags = action.payload.sort((a, b) => a.title.localeCompare(b.title));
      const sortChildren = (tagslist) => {
        tagslist.forEach((t) => {
          t.children = t.children.sort((a, b) => a.title.localeCompare(b.title));
          sortChildren(t.children);
        });
      };
      sortChildren(tags);
      state.tags = tags;
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setArticleTags: (state, action) => {
      state.articleTags = action.payload;
    },
    selectTag: (state, action) => {
      state.selectedTags = modeParser(state).selectTag(action.payload);
    },
    deselectTag: (state, action) => {
      state.selectedTags = modeParser(state).deselectTag(action.payload);
    },
  },
});

export const selectTags = (state) => state.tag.tags;
export const selectSelectedTags = (state) => state.tag.selectedTags;
export const getTagClasses = (state) => {
  const model = modeParser(state.tag);
  return (tag) => model.getClasses(tag);
};

export const {
  setTags, setSelectedTags, setArticleTags, selectTag, toggleMode, deselectTag,
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
