import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import BallBeat from 'react-pure-loaders/build/BallBeat';
import moment from 'moment';
import ScrollToTop from 'react-scroll-up';
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
      {/* eslint-disable-next-line react/no-danger */}
      <div className="max-w-2xl m-auto mb-64 article " dangerouslySetInnerHTML={{ __html: article.html }} />
      <ScrollToTop
        duration={1250}
        showUnder={160}
        easing="easeInOutSine"
        style={{
          margin: '0', marginRight: '18px', marginBottom: '18px', fontSize: '12px', height: '32px', outline: '0',
        }}
      >
        <span className="text-base font-sans bg-gray-200 text-black p-2 rounded-2xl">Back to top</span>
      </ScrollToTop>
    </div>
  );
}

export default FullArticle;
