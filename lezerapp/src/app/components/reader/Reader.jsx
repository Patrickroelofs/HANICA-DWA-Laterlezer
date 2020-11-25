import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStore } from 'react-redux';
import './Reader.scss';
import Dock from '../dock/Dock';
import FullArticle from '../fullArticle/FullArticle';
import ArticleSidebar from '../articleSidebar/ArticleSidebar';

function Reader() {
  const store = useStore();
  const { id } = useParams();
  const [article, setArticle] = useState({});

  axios.interceptors.request.use((config) => {
    if (store.getState().user) {
      config.headers.Username = store.getState().user.username;
    }
    return config;
  });

  const getArticle = () => {
    axios.get(`http://localhost:3000/api/articles/${id}`).then(({ data }) => {
      setArticle(data);
    });
  };

  const tagsUpdated = ({ data }) => {
    setArticle(data);
  };

  useEffect(() => {
    getArticle();
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
                url={`${id}`}
                onSubmit={tagsUpdated}
              />
            </div>
          </div>
        </nav>
        <main className="min-h-screen col-span-3 bg-white">
          <div className="container max-w-5xl mx-auto p-16 pt-8 pb-0">
            <FullArticle article={article} />
          </div>
        </main>
      </div>
    </div>

  );
}

export default Reader;
