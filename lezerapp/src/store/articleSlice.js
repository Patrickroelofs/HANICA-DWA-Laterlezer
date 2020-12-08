import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: {},
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
      console.log('test');
      state.articles.map((article) => {
        console.log(article._id, action.payload._id);
        let res = article;
        if (article._id === action.payload._id) {
          res = action.payload;
        }
        return res;
      });
    },
  },
});

export const selectArticles = (state) => state.article.articles;
export const findCurrentArticle = (state) => state.article.articles.find((article) => article._id === state.article.currentArticleId);
export const selectCurrentArticle = (state) => state.article.currentArticle;

export const {
  setArticles, setCurrentArticle, setCurrentArticleId, updateArticle,
} = articleSlice.actions;
export default articleSlice.reducer;
