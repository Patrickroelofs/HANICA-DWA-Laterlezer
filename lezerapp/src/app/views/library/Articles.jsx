import React, { memo, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Article from './components/article/Article';
import { getArticles, selectArticles, setArticles } from '../../../store/articleSlice';
import { selectSelectedTags } from '../../../store/tagSlice';

const Articles = () => {
  const dispatch = useDispatch();
  const { status } = useParams();

  const selectedTags = useSelector(selectSelectedTags);
  const articles = useSelector(selectArticles);

  useEffect(() => {
    dispatch(getArticles(status));
  }, []);

  const getFilteredArticles = () => {
    let tags = '';
    selectedTags.forEach((t, i) => {
      if (i === 0) {
        tags += `title=${t.title}`;
      } else {
        tags += `&title=${t.title}`;
      }
    });

    axios.get(`http://localhost:3000/api/articles/tags/filter?${tags}&status=${status}`).then(({ data }) => {
      dispatch(setArticles(data));
    });
  };

  useEffect(() => {
    if (selectedTags.length <= 0) {
      getArticles();
    } else {
      getFilteredArticles();
    }
  }, [selectedTags, status]);

  return (
    <>
      <h1 className="font-bold text-xl">My library</h1>
      <p className="text-sm pt-4">
        {status === 'archived' && 'All your archived articles.'}
        {status === 'today' && 'All your articles added today.'}
        {!status && 'All your saved articles.'}
      </p>
      <div className="mt-12 mb-64">
        {(articles.length > 0) ? articles.map((article) => <Article key={article._id} article={article} />) : <span>No articles found with this filter.</span> }
      </div>
    </>
  );
};

export default memo(Articles, (prevProps, nextProps) => prevProps === nextProps);
