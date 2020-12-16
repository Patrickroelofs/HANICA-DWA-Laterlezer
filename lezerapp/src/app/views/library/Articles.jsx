import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Article from './components/article/Article';
import { selectArticles, setArticles } from '../../../store/articleSlice';
import { selectSelectedTags } from '../../../store/tagSlice';

function Articles() {
  const dispatch = useDispatch();
  const { status } = useParams();

  const selectedTags = useSelector(selectSelectedTags);
  const articles = useSelector(selectArticles);

  const getArticles = () => {
    axios.get(`http://localhost:3000/api/articles?status=${status}`).then(({ data }) => {
      dispatch(setArticles(data));
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

    axios.get(`http://localhost:3000/api/articles/tags/filter?${tags}&status=${status}`).then(({ data }) => {
      dispatch(setArticles(data.reverse()));
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
      <p className="text-sm pt-4">All your saved articles.</p>
      <div className="mt-12 mb-64">
        {(articles) ? articles.map((article) => <Article key={article._id} article={article} />) : <span>No articles found.</span> }
      </div>
    </>
  );
}

export default Articles;
