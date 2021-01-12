import { createSlice } from '@reduxjs/toolkit';
import { get, post } from 'axios';
import moment from 'moment';

const API_URL = 'http://localhost:3000/api';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
    setCurrentArticleId: (state, action) => {
      state.currentArticleId = action.payload;
    },
    updateArticle: (state, action) => {
      state.articles = state.articles.map((article) => (article._id === action.payload._id ? action.payload : article));
    },
    removeArticle: (state, action) => {
      state.articles = state.articles.filter((article) => article._id !== action.payload._id);
    },
  },
});

export const selectArticles = (state) => state.article.articles;
export const findCurrentArticle = (state) => state.article.articles.find((article) => article._id === state.article.currentArticleId);
export const selectCurrentArticle = (state) => state.article.currentArticle;

export const {
  setArticles, setCurrentArticle, setCurrentArticleId, updateArticle, removeArticle,
} = articleSlice.actions;
export default articleSlice.reducer;

export const getArticles = (status, range, tags = []) => async (dispatch) => {
  const joinedTags = tags.map((t) => t.title).join(',');

  try {
    const { data } = await get(`${API_URL}/articles?status=${status}&range=${range}&tags=${joinedTags}`);
    dispatch(setArticles(data));
  } catch (err) {
    throw new Error(err);
  }
};

export const getArticle = (_id) => async (dispatch) => {
  try {
    const { data } = await get(`${API_URL}/articles/${_id}`);
    dispatch(setCurrentArticle(data));
  } catch (err) {
    throw new Error(err);
  }
};

export const addTags = (_id, tags = []) => async (dispatch) => {
  try {
    const { data } = await post(`${API_URL}/articles/${_id}`, { tags });
    dispatch(setCurrentArticle(data));
  } catch (err) {
    throw new Error(err);
  }
};

export const read = ({ _id, readAt }) => async (dispatch) => {
  try {
    const { data } = await post(`${API_URL}/articles/${_id}/status`, {
      readAt: readAt ? null : moment().toISOString(),
    });
    dispatch(updateArticle(data));
  } catch (err) {
    throw new Error(err);
  }
};

export const archive = ({ _id, archivedAt }) => async (dispatch) => {
  try {
    const { data } = await post(`${API_URL}/articles/${_id}/status`, {
      archivedAt: archivedAt ? null : moment().toISOString(),
    });
    dispatch(removeArticle(data));
  } catch (err) {
    throw new Error(err);
  }
};

export const prioritize = ({ _id, prioritizedAt }) => async (dispatch) => {
  try {
    const { data } = await post(`${API_URL}/articles/${_id}/status`, {
      prioritizedAt: prioritizedAt ? null : moment().toISOString(),
    });
    dispatch(updateArticle(data));
  } catch (err) {
    throw new Error(err);
  }
};
