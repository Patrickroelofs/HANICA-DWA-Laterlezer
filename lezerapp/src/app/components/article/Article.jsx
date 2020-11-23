/* eslint-disable no-underscore-dangle */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../thumbnail/Thumbnail';

function Article(props) {
  const { article } = props;

  return (
    <Link to={`app/${article._id}`}>
      <article className="grid grid-cols-4 mt-6 h-48">
        <Thumbnail url={article.image || 'https://placehold.it/125x100'} />
        <div className="col-span-3 ml-8">
          <strong className="font-bold text-xl">{ article.title }</strong>
          <p className="text-base mt-4">
            { article.description }
          </p>
        </div>
      </article>
    </Link>
  );
}

export default Article;
