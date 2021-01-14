import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loadable from '@loadable/component';
import BallBeat from 'react-pure-loaders/build/BallBeat';

import { selectUsername } from '../../../store/userSlice';
import { selectCurrentArticle, getArticle } from '../../../store/articleSlice';
import ArticleHeader from './components/articleHeader/ArticleHeader';

import ArticleTopBar from './components/articleTopBar/ArticleTopBar';
import { useInterceptor } from '../../../utils/helpers';

const FullArticle = loadable(() => import('./components/fullArticle/FullArticle'));

function Reader() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const username = useSelector(selectUsername);
  const article = useSelector(selectCurrentArticle);

  useInterceptor(username);

  useEffect(() => {
    dispatch(getArticle(id));
  }, []);

  return (
    <>
      <ArticleTopBar />
      <div className="container max-w-5xl mx-auto p-16 pt-8 pb-0">
        {article ? (
          <>
            <ArticleHeader article={article} />
            <FullArticle
              html={article.html}
              id={article._id}
              fallback={(
                <div className="w-full h-screen relative">
                  <div className="text-center inline-block absolute left-2/4 top-1/3">
                    <BallBeat color="#000" loading />
                  </div>
                </div>
              )}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export default Reader;
