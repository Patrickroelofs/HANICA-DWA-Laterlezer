import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Thumbnail from '../thumbnail/Thumbnail';
import TagPill from '../tagPill/TagPill';
import { setCurrentArticle } from '../../../store/articleSlice';
import { selectSelectedTags, setSelectedTags } from '../../../store/tagSlice';

function Article({ article }) {
  const {
    _id, image, tags, title, description,
  } = article;
  const selectedTags = useSelector(selectSelectedTags);

  const dispatch = useDispatch();

  const selectTag = (tag) => {
    let tagss = [...selectedTags];
    if (!tagss.includes(tag.title)) {
      tagss.push(tag.title);
    } else {
      tagss = selectedTags.filter((t) => t !== tag.title);
    }
    dispatch(setSelectedTags(tagss));
  };
  return (
    <Link to={`app/${_id}`} onClick={() => dispatch(setCurrentArticle(article))}>
      <article className="grid grid-cols-4 mt-6">
        <Thumbnail url={image || 'https://placehold.it/125x100'} />
        <div className="col-span-3 ml-8">
          <div className="articleTags pb-2 text-xs overflow-x-hidden whitespace-nowrap overflow-ellipsis">
            { (tags) ? tags.map((tag) => (
              <NavLink key={tag.title} to="/app" onClick={() => selectTag(tag)} value={tag._id}>
                <TagPill data={tag} />
              </NavLink>
            )) : <span>No tags found</span> }
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
