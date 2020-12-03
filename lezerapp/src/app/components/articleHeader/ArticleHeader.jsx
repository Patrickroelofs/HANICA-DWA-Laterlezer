import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import TagPill from '../tagPill/TagPill';
import { selectCurrentArticle } from '../../../store/articleSlice';
import { setSelectedTags } from '../../../store/tagSlice';

export default function ArticleHeader() {
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);

  const clickHandler = (tag) => {
    dispatch(setSelectedTags([tag.title]));
  };
  return (
    <>
      <div className="flex justify-between">
        <Link to="/app">
          <KeyboardArrowLeftIcon />
          Back
        </Link>
        <a rel="noreferrer" target="_blank" href={article.source}>
          Source
          <KeyboardArrowRightIcon />
        </a>
      </div>
      <div className="articleTags pb-6 pt-6 text-sm">

        { (article.tags) ? article.tags.map((tag) => (
          <Link key={tag.title} to="/app" onClick={() => clickHandler(tag)} value={tag}>
            <TagPill data={tag} />
          </Link>
        )) : <span>No tags found</span> }
      </div>
      <h1 className="font-bold text-3xl pb-4">{article.title}</h1>
      <small className="text-md italic pb-4 block">
        { article.author }
              &nbsp;
        { article.published ? 'published on' : '' }
              &nbsp;
        { article.published !== null
          ? moment(article.published).format('DD-MM-YYYY')
          : null }
      </small>
      <div>
        { article.html && !article.html.includes(article.image) ? <img className="rounded-xl mb-8 shadow-xl" alt="news" src={article.image} /> : '' }
      </div>
    </>
  );
}
