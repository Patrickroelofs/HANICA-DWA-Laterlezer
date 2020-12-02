import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'axios';
import Article from '../article/Article';
import { selectArticles, setArticles } from '../../../store/articleSlice';

function Articles() {
  const articles = useSelector(selectArticles);
  const dispatch = useDispatch();

  useEffect(() => {
    get('http://localhost:3000/api/articles').then(({ data }) => {
      dispatch(setArticles(data));
    });
  }, []);

  return (
    <>
      <h1 className="font-bold text-xl">My library</h1>
      <p className="text-sm pt-4">All your saved articles.</p>
      <div className="mt-12 mb-64">
        { articles && articles.map((article) => <Article key={article._id} article={article} />) }
      </div>
    </>
  );
}

export default Articles;
