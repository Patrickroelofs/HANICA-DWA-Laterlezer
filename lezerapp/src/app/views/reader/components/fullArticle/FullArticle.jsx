import React, { memo } from 'react';

import ScrollToTop from 'react-scroll-up';

import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import moment from 'moment';

function FullArticle({ html, id }) {
  window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      axios.post(`http://localhost:3000/api/articles/${id}/status`, { readAt: moment().toISOString() });
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
