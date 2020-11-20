import React, { useEffect, useState } from 'react';
import './articles.scss';
import axios from 'axios';
import Article from '../article/Article';

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
      <h1>Programming</h1>
      <p>Everything about programming</p>

      <div className="articles">
        {/* eslint-disable-next-line no-underscore-dangle */}
        { articles.map((article) => <Article key={article._id} article={article} />) }
      </div>
    </>
  );
}

export default Articles;
