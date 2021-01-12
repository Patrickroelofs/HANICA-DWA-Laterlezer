import React from 'react';
import AddTagToArticle from './addTagToArticle/AddTagToArticle';
import ArchiveArticle from './ArchiveArticle/ArchiveArticle';
import PrioritizeArticle from './PrioritizeArticle/PrioritizeArticle';

function ArticleTopBar() {
  return (
    <div className="bg-gray-50 flex justify-between">
      <div id="left" className="flex justify-left">
        {/* Left */}
      </div>
      <div id="center" className="flex justify-center">
        <AddTagToArticle />
        <ArchiveArticle />
        <PrioritizeArticle />
      </div>
      <div id="right" className="flex justify-right">
        {/* Right */}
      </div>
    </div>
  );
}

export default ArticleTopBar;
