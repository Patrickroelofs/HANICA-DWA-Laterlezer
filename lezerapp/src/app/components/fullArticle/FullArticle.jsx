import React from 'react';
import { Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { BallBeat } from 'react-pure-loaders';
import moment from 'moment';
import BackToTop from 'react-back-to-top-button';
import TagPill from '../tagPill/TagPill';

function FullArticle(props) {
  const { article, loading } = props;

  if (loading) {
    return (
      <div className="w-full h-screen relative">
        <div className="text-center inline-block absolute left-2/4 top-1/3">
          <BallBeat
            color="#000"
            loading={loading}
          />
        </div>
      </div>
    );
  }
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
      <div className="max-w-2xl m-auto mb-64 article " dangerouslySetInnerHTML={{ __html: article.html }} />
      <BackToTop
        speed={1250}
        easing="easeInOutSine"
        style={{
          margin: '0', 'margin-right': '18px', 'margin-bottom': '18px', 'font-size': '12px', height: '32px', outline: '0',
        }}
      >
        <span className="text-base font-sans bg-gray-200 text-black p-2 rounded-2xl">Back to top</span>
      </BackToTop>
    </div>
  );
}

export default FullArticle;
