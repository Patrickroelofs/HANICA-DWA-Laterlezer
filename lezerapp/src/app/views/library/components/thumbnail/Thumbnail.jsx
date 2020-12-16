import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

function Thumbnail({ url }) {
  return (
    <>
      <div className="w-auto h-36 rounded-xl col-span-1 shadow-xl">
        <LazyLoadImage className="w-full h-36 rounded-xl object-cover object-center" effect="blur" src={url} />
      </div>
    </>
  );
}

export default Thumbnail;
