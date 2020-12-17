import { createSlice } from '@reduxjs/toolkit';

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
