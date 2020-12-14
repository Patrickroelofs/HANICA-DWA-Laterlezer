import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import loadable from '@loadable/component';
import BallBeat from 'react-pure-loaders/build/BallBeat';

import Dock from '../sharedcomponents/dock/Dock';
import { selectUsername } from '../../../store/userSlice';
import { setCurrentArticleId, selectCurrentArticle, setCurrentArticle } from '../../../store/articleSlice';
import ArticleHeader from './components/articleHeader/ArticleHeader';

import './Reader.scss';
import ArticleTopBar from './components/articleTopBar/ArticleTopBar';

const FullArticle = loadable(() => import('./components/fullArticle/FullArticle'));

function Reader() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const username = useSelector(selectUsername);
  const article = useSelector(selectCurrentArticle);

  axios.interceptors.request.use((config) => {
    if (username) config.headers.Username = username;
    return config;
  });

  const fetchArticle = () => {
    axios.get(`http://localhost:3000/api/articles/${id}`).then(({ data }) => {
      dispatch(setCurrentArticle(data));
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
              {/* Sidebar should be moved to app.jsx file (this entire file needs rework) */}
            </div>
          </div>
        </nav>
        <main className="min-h-screen col-span-3 bg-white">
          <ArticleTopBar />
          <div className="container max-w-5xl mx-auto p-16 pt-8 pb-0 prose lg:prose-sm">
            <ArticleHeader article={article} />
            <FullArticle
              html={article.html}
              fallback={(
                <div className="w-full h-screen relative">
                  <div className="text-center inline-block absolute left-2/4 top-1/3">
                    <BallBeat
                      color="#000"
                      loading
                    />
                  </div>
                </div>
)}
            />
          </div>
        </main>
      </div>
    </div>

  );
}

export default Reader;
