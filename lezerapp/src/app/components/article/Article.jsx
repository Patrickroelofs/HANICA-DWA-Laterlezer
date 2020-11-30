import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../thumbnail/Thumbnail';
import TagPill from '../tagPill/TagPill';

function Article({ article }) {
  const {
    _id, image, tags, title, description,
  } = article;
  return (
    <Link to={`app/${_id}`}>
      <article className="grid grid-cols-4 mt-6">
        <Thumbnail url={image || 'https://placehold.it/125x100'} />
        <div className="col-span-3 ml-8">
          <div className="articleTags pb-2 text-xs overflow-x-hidden whitespace-nowrap overflow-ellipsis">
            { (tags) ? tags.map((tag) => <TagPill key={tag.title} data={tag} />) : <span>No tags found</span> }
          </div>
          <strong className="font-bold text-md">{ title }</strong>
          <p className="text-xs mt-4">
            { description }
          </p>
        </div>
      </article>
    </Link>
  );
}

export default Article;
