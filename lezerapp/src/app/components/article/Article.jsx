/* eslint-disable no-underscore-dangle */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import './article.scss';
import Thumbnail from '../thumbnail/Thumbnail';

function Article(props) {
  const { article } = props;

  return (
    <Link to={`app/${article._id}`}>
      <article className="article">
        <Thumbnail url={article.image || 'https://placehold.it/125x100'} />
        <div className="content">
          <strong>{ article.title }</strong>
          <p>
            { article.description }
          </p>
        </div>
      </article>
    </Link>
  );
}

export default Article;
