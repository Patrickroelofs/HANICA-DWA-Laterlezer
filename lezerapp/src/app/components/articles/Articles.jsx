import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Article from '../article/Article';

function Articles() {
  const [articles, setArticles] = useState([]);
  const selectedTags = useSelector((state) => state.tagList.selectedTags);

  const getArticles = () => {
    axios.get('http://localhost:3000/api/articles').then(({ data }) => {
      setArticles(data);
    });
  };

  const getFilteredArticles = () => {
    let tags = '';
    selectedTags.forEach((t, i) => {
      if (i === 0) {
        tags += `title=${t}`;
      } else {
        tags += `&title=${t}`;
      }
    });

    axios.get(`http://localhost:3000/api/articles/tags/filter?${tags}`).then(({ data }) => {
      setArticles(data);
    });
  };

  useEffect(() => {
    if (selectedTags.length === 0) {
      getArticles();
    } else {
      getFilteredArticles();
    }
  }, [selectedTags]);

  return (
    <>
      <h1 className="font-bold text-xl">All Articles</h1>
      <p className="text-sm pt-4">All your saved articles.</p>

      <div className="mt-12 mb-64">
        {/* eslint-disable-next-line no-underscore-dangle */}
        {(articles.length > 0) ? articles.map((article) => <Article key={article._id} article={article} />) : <span>No articles found.</span> }
      </div>
    </>
  );
}

export default Articles;
