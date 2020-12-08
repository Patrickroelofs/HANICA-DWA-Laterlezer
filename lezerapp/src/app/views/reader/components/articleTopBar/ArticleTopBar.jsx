/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import AddTagToArticle from './addTagToArticle/AddTagToArticle';

function ArticleTopBar() {
  return (
    <div className="bg-gray-50 flex justify-between">
      <div id="left" className="flex justify-left">
        {/* Left */}
      </div>
      <div id="center" className="flex justify-center">
        <AddTagToArticle />
      </div>
      <div id="right" className="flex justify-right">
        {/* Right */}
      </div>
    </div>
  );
}

export default ArticleTopBar;
