import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Article from '../article/Article';
import ArticleSkeleton from '../skeleton/ArticleSkeleton';

function Articles() {
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    axios.get('http://localhost:3000/api/articles').then(({ data }) => {
      setArticles(data);
    });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <h1 className="font-bold text-xl">My library</h1>
      <p className="text-sm pt-4">All your saved articles.</p>
      <div className="mt-12 mb-64">
        <ArticleSkeleton />
        { articles.map((article) => <Article key={article._id} article={article} />) }
      </div>
    </>
  );
}

export default Articles;
