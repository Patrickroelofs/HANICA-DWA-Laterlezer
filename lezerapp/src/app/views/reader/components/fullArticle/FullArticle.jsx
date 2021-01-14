import React, { memo } from 'react';
import ScrollToTop from 'react-scroll-up';
import { useDispatch } from 'react-redux';

import { read } from '../../../../../store/articleSlice';

import 'react-lazy-load-image-component/src/effects/blur.css';

function FullArticle({ html, id }) {
  const dispatch = useDispatch();

  window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      dispatch(read({ _id: id }));
    }
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="max-w-2xl m-auto mb-64 article prose lg:prose-sm" dangerouslySetInnerHTML={{ __html: html }} />
      <ScrollToTop duration={1250} showUnder={160} easing="easeInOutSine">
        <span className="text-base font-sans bg-gray-200 text-black p-2 rounded-2xl">Back to top</span>
      </ScrollToTop>
    </>
  );
}

export default memo(FullArticle);
