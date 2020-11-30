import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Dock from '../dock/Dock';
import FullArticle from '../fullArticle/FullArticle';
import ArticleSidebar from '../articleSidebar/ArticleSidebar';
import { selectUsername } from '../../../store/userSlice';
import { setCurrentArticleId, selectCurrentArticle, setCurrentArticle } from '../../../store/articleSlice';
import ArticleHeader from '../articleHeader/ArticleHeader';

import './Reader.scss';

function Reader() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const username = useSelector(selectUsername);
  const article = useSelector(selectCurrentArticle);

  axios.interceptors.request.use((config) => {
    if (username) config.headers.Username = username;
    return config;
  });

  const fetchArticle = () => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/articles/${id}`).then(({ data }) => {
      dispatch(setCurrentArticle(data));
      setLoading(false);
    });
  };

  useEffect(() => {
    dispatch(setCurrentArticleId(id));
    fetchArticle();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-serif text-sm">
      <div className="min-h-full md:grid grid-cols-4">
        <nav className="col-span-1">
          <div className="grid grid-cols-5 min-h-full">
            <div className="col-span-1 bg-white relative top-0">
              <Dock />
            </div>
            <div className="col-span-4">
              <ArticleSidebar
                initSelectedTags={article.tags}
                url={id}
                onSubmit={({ data }) => dispatch(setCurrentArticle(data))}
              />
            </div>
          </div>
        </nav>
        <main className="min-h-screen col-span-3 bg-white">
          <div className="container max-w-5xl mx-auto p-16 pt-8 pb-0 prose lg:prose-sm">
            <ArticleHeader article={article} />
            <FullArticle article={article} loading={loading} />
          </div>
        </main>
      </div>
    </div>

  );
}

export default Reader;
