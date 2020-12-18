import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Article from './components/article/Article';
import { getArticles, selectArticles } from '../../../store/articleSlice';
import { selectSelectedTags } from '../../../store/tagSlice';

const Articles = () => {
  const dispatch = useDispatch();
  const { status } = useParams();

  const selectedTags = useSelector(selectSelectedTags);
  const articles = useSelector(selectArticles);

  useEffect(() => {
    dispatch(getArticles(status, selectedTags));
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
