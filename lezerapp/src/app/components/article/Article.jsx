import React from 'react';
import './article.scss';

function Article() {
  return (
    <>
      <article>
        <img alt="" src="https://placehold.it/125x100" />
        <div className="content">
          <strong>Javascript is a very cool language</strong>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet
            quo odio veniam.
          </p>
        </div>
      </article>
    </>
  );
}

export default Article;
