import { Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';

function FullArticle(props) {
  const { article } = props;

  console.log(props);

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
      <div className="articleTags pb-6 pt-6">
        { (article.tags) ? article.tags.map((tag) => <span className="inline-block pt-2 pb-2 pr-3 pl-3 mr-2 text-sm white rounded-3xl font-sans" key={tag.id} style={{ background: tag.color }}>{tag.title}</span>) : <span>No tags found</span> }
      </div>
      <h1 className="font-bold text-3xl pb-4">{article.title}</h1>
      <small className="text-md italic pb-4 block">
        { article.author }
        ,&nbsp;
        { article.published ? 'published on' : '' }
            &nbsp;
        { moment(article.published).format('DD-MM-YYYY') }
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
