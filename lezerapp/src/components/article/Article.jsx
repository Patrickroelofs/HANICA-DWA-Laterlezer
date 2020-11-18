import React from 'react';
import './article.scss';

export const Article = () => {
  return (
    <React.Fragment>
      <article>
        <img alt="" src="https://placehold.it/125x100" />
        <div class="content">
          <strong>Javascript is a very cool language</strong>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet
            quo odio veniam.
          </p>
        </div>
      </article>
    </React.Fragment>
  );
};

