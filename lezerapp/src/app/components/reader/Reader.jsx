import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './reader.scss';

function Reader() {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  const getArticle = () => {
    fetch(`http://localhost:3000/api/articles/${id}`).then((res) => res.json()).then((data) => {
      console.log(data.html.includes(data.image));
      setArticle(data);
    });
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div className="reader">
      <div className="reader__navbar">
        <Link to="/app">
          <KeyboardArrowLeft />
          Back
        </Link>
        <a href={article.source}>
          Source
          <KeyboardArrowRight />
        </a>
      </div>
      <h1>{article.title}</h1>
      <small>
        { article.author }
        ,&nbsp;
        { article.published ? 'published on' : '' }
        &nbsp;
        { article.published }
      </small>
      <div>
        { article.html && !article.html.includes(article.image) ? <img alt="news" src={article.image} /> : '' }
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: article.html }} />
    </div>
  );
}

export default Reader;
