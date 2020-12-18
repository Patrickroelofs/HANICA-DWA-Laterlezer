import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Article from './components/article/Article';
import { getArticles, selectArticles } from '../../../store/articleSlice';
import { selectSelectedTags, selectTags } from '../../../store/tagSlice';

const Articles = () => {
  const dispatch = useDispatch();
  const { status } = useParams();

  const selectedTags = useSelector(selectSelectedTags);
  const articles = useSelector(selectArticles);
  const allTags = useSelector(selectTags);

  const [statusDescription, setStatusDescription] = useState('');

  useEffect(() => {
    dispatch(getArticles(status, selectedTags));
  }, [selectedTags, status, allTags]);

  useEffect(() => {
    switch (status) {
      case 'archived':
        setStatusDescription('All your archived articles.');
        break;
      case 'today':
        setStatusDescription('All your articles added today.');
        break;
      case 'week':
      case 'month':
      case 'year':
        setStatusDescription(`All your articles added this ${status}.`);
        break;

      default:
        setStatusDescription('All your saved articles.');
        break;
    }
  }, [status]);

  return (
    <>
      <h1 className="font-bold text-xl">My library</h1>
      <p className="text-sm pt-4">
        { statusDescription }
      </p>
      <div className="mt-12 mb-64">
        {(articles.length > 0) ? articles.map((article) => <Article key={article._id} article={article} />) : <span>No articles found with this filter.</span> }
      </div>
    </>
  );
};

export default memo(Articles, (prevProps, nextProps) => prevProps === nextProps);
