import { createSlice } from '@reduxjs/toolkit';
import { get } from 'axios';

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
    updateArticleTag: (state, action) => {
      const articleTags = state.currentArticle.tags;
      for (let i = 0; i < articleTags.length; i++) {
        if (articleTags[i]._id === action.payload._id) {
          articleTags[i].title = action.payload.title;
          articleTags[i].color = action.payload.color;
        }
      }
      state.currentArticle.tags = articleTags;
    },
    deleteArticleTag: (state, action) => {
      const articleTags = [];
      for (let i = 0; i < articleTags.length; i++) {
        if (state.currentArticle.tags[i]._id !== action.payload._id) {
          articleTags.push(state.currentArticle.tags[i]);
        }
      }
      state.currentArticle.tags = articleTags;
    },
  },
});

export const selectArticles = (state) => state.article.articles;
export const findCurrentArticle = (state) => state.article.articles.find((article) => article._id === state.article.currentArticleId);
export const selectCurrentArticle = (state) => state.article.currentArticle;

export const {
  setArticles, setCurrentArticle, setCurrentArticleId, updateArticle, removeArticle, updateArticleTag, deleteArticleTag,
} = articleSlice.actions;
export default articleSlice.reducer;

export const getArticles = (status, range, tags = []) => (dispatch) => {
  const joinedTags = tags.map((t) => t.title).join(',');
  get(`${API_URL}/articles?status=${status}&range=${range}&tags=${joinedTags}`)
    .then(({ data }) => dispatch(setArticles(data)));
};
