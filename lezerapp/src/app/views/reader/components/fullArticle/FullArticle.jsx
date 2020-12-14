import React, { memo, useEffect } from 'react';

import ScrollToTop from 'react-scroll-up';

import 'react-lazy-load-image-component/src/effects/blur.css';

function FullArticle({ html }) {
  const listener = () => {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
      lazyImages.forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage);
      });
    }
  };

  useEffect(() => {
    listener();
  });

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="max-w-2xl m-auto mb-64 article" dangerouslySetInnerHTML={{ __html: html }} />
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

export default memo(FullArticle);
