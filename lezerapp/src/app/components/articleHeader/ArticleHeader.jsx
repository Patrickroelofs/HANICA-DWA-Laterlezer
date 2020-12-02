import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useSelector } from 'react-redux';
import TagPill from '../tagPill/TagPill';
import { selectCurrentArticle } from '../../../store/articleSlice';

export default function ArticleHeader() {
  const article = useSelector(selectCurrentArticle);

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
        { (article.tags) ? article.tags.map((tag) => <TagPill key={tag.title} data={tag} />) : <span>No tags found</span> }
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
