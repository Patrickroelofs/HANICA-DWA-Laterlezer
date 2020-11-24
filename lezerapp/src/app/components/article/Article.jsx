/* eslint-disable no-underscore-dangle */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../thumbnail/Thumbnail';

function Article(props) {
  const { article } = props;

  return (
    <Link to={`app/${article._id}`}>
      <article className="grid grid-cols-4 mt-6 h-36">
        <Thumbnail url={article.image || 'https://placehold.it/125x100'} />
        <div className="col-span-3 ml-8">
          <div className="articleTags pb-4">
            { (article.tags) ? article.tags.map((tag) => <span className="inline-block pt-1 pb-1 pr-2 pl-2 mr-2 white rounded-3xl font-sans text-xs" key={tag.id} style={{ background: tag.color }}>{tag.title}</span>) : <span>No tags found</span> }
          </div>
          <strong className="font-bold text-md">{ article.title }</strong>
          <p className="text-xs mt-4">
            { article.description }
          </p>
        </div>
      </article>
    </Link>
  );
}

export default Article;
