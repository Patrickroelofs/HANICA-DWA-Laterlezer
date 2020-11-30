import React from 'react';

import BallBeat from 'react-pure-loaders/build/BallBeat';
import ScrollToTop from 'react-scroll-up';
import { useSelector } from 'react-redux';
import { selectCurrentArticle } from '../../../store/articleSlice';

function FullArticle({ loading }) {
  const article = useSelector(selectCurrentArticle);
  if (loading) {
    return (
      <>
        <div className="w-full h-screen relative">
          <div className="text-center inline-block absolute left-2/4 top-1/3">
            <BallBeat
              color="#000"
              loading={loading}
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        { article.html && !article.html.includes(article.image) ? <img className="rounded-xl mb-8 shadow-xl" alt="news" src={article.image} /> : '' }
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="max-w-2xl m-auto mb-64 article " dangerouslySetInnerHTML={{ __html: article.html }} />
      <ScrollToTop
        duration={1250}
        showUnder={160}
        easing="easeInOutSine"
        style={{
          margin: '0', marginRight: '18px', marginBottom: '18px', fontSize: '12px', height: '32px', outline: '0',
        }}
      >
        <span className="text-base font-sans bg-gray-200 text-black p-2 rounded-2xl">Back to top</span>
      </ScrollToTop>
    </>
  );
}

export default FullArticle;
