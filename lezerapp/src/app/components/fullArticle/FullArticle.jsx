import { Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import TagPill from '../tagPill/TagPill';

function FullArticle(props) {
  const { article } = props;

  console.log(article);

  return (
    <div className="reader">
      <div className="flex justify-between">
        <Link to="/app">
          <KeyboardArrowLeft />
          Back
        </Link>
        <a rel="noreferrer" target="_blank" href={article.source}>
          Source
          <KeyboardArrowRight />
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
      {/* eslint-disable-next-line react/no-danger */}
      <div className="max-w-2xl m-auto mb-64 article" dangerouslySetInnerHTML={{ __html: article.html }} />
    </div>
  );
}

export default FullArticle;
