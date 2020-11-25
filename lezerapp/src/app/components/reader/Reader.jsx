import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import axios from 'axios';
import moment from 'moment';
import TagPill from '../tagPill/TagPill';

import './Reader.scss';

function Reader() {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  const getArticle = () => {
    axios.get(`http://localhost:3000/api/articles/${id}`).then(({ data }) => {
      setArticle(data);
    });
  };

  useEffect(() => {
    getArticle();
  }, []);

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
      <div className="articleTags pb-6 pt-16 text-sm">
        { (article.tags) ? article.tags.map((tag) => <TagPill key={tag.title} data={tag} />) : <span>No tags found</span> }
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

export default Reader;
