import React, { useEffect, useState } from 'react';
import './articles.scss';
import Article from '../article/Article';

function Articles() {
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    fetch('http://localhost:3000/api/articles').then((res) => res.json()).then((data) => {
      setArticles(data);
    });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <h1>Programming</h1>
      <p>Everything about programming</p>

      <div className="articles">
        { articles.map((article) => <Article article={article} />) }
      </div>
    </>
  );
}

export default Articles;
