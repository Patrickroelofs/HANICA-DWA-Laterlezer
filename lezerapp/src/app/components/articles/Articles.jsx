import React from 'react';
import './articles.scss';

import Article from '../article/Article';

function Articles() {
  return (
    <>
      <h1>Programming</h1>
      <p>Everything about programming</p>

      <div className="articles">
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
    </>
  );
}

export default Articles;
