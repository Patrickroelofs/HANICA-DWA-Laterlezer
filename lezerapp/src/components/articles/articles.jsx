import React from 'react';
import './articles.scss';

import { Article } from './../article/article';

export const Articles = () => {
  return (
    <React.Fragment>
      <h1>Programming</h1>
      <p>Everything about programming</p>

      <div className="articles">
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
    </React.Fragment>
  );
};
