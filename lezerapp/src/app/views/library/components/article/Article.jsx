import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MoreVert } from '@material-ui/icons';
import Thumbnail from '../thumbnail/Thumbnail';
import TagPill from '../../../sharedcomponents/tagPill/TagPill';
import { setCurrentArticle } from '../../../../../store/articleSlice';
import { selectSelectedTags, setSelectedTags } from '../../../../../store/tagSlice';
import ArticleDropdown from '../articleDropdown/ArticleDropdown';

function Article({ article }) {
  const [options, setOptions] = useState(false);
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

  const openOptions = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOptions(!options);
  };

  return (
    <Link to={`/app/${_id}`} onClick={() => dispatch(setCurrentArticle(article))}>
      <article className="grid grid-cols-4 mt-6">
        <Thumbnail url={image || 'https://placehold.it/125x100'} />
        <div className="col-span-3 ml-8">
          <div className="articleTags pb-2 text-xs overflow-x-hidden whitespace-nowrap overflow-ellipsis">
            { (tags) ? tags.map((tag) => (
              <Link key={tag.title} to="/app" onClick={() => selectTag(tag)} value={tag._id}>
                <TagPill data={tag} />
              </Link>
            )) : <span>No tags found</span> }
          </div>
          <strong className="font-bold text-md">{ title }</strong>
          <div className="relative inline-block text-left float-right">
            <MoreVert onClick={openOptions} />
            { options && <ArticleDropdown article={article} /> }
          </div>
          <p className="text-xs mt-4">
            { description }
          </p>
        </div>
      </article>
    </Link>
  );
}

export default Article;
