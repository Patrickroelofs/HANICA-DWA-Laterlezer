import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import TagPill from '../../../sharedcomponents/tagPill/TagPill';
import { selectCurrentArticle } from '../../../../../store/articleSlice';
import {
  selectSelectedTags,
  setArticleTags,
  setSelectedTags,
} from '../../../../../store/tagSlice';

export default function ArticleHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const article = useSelector(selectCurrentArticle);
  const selectedTags = useSelector(selectSelectedTags);
  const [previouslySelectedTags, setPreviouslySelectedTags] = useState([]);

  const clickHandler = ({ title }) => {
    history.goBack();
    dispatch(setSelectedTags([title]));
  };

  useEffect(() => {
    setPreviouslySelectedTags(selectedTags);
    dispatch(setArticleTags(article.tags.map((tag) => tag.title)));
    dispatch(setSelectedTags(article.tags.map((tag) => tag.title)));
  }, []);

  const goBack = () => {
    history.goBack();
    dispatch(setArticleTags([]));
    dispatch(setSelectedTags(previouslySelectedTags || []));
    setPreviouslySelectedTags([]);
  };

  return (
    <>
      <div className="flex justify-between">
        <button type="button" className="focus:outline-none" onClick={goBack}>
          <KeyboardArrowLeftIcon />
          Back
        </button>
        <a rel="noreferrer" target="_blank" href={article.source}>
          Source
          <KeyboardArrowRightIcon />
        </a>
      </div>
      <div className="articleTags pb-6 pt-6 text-sm">
        { (article.tags) && article.tags.map((tag) => (
          <button type="button" key={tag._id} className="focus:outline-none" onClick={() => clickHandler(tag)} value={tag._id}>
            <TagPill data={tag} />
          </button>
        )) }
      </div>
      <h1 className="font-bold text-3xl pb-4">{article.title}</h1>
      { article.author && article.published && (
      <small className="text-md italic pb-4 block">
        { article.author }
              &nbsp;
        { article.published && 'published on' }
              &nbsp;
        { article.published !== null && moment(article.published).format('DD-MM-YYYY')}
      </small>
      )}

      { article.html && !article.html.includes(article.image) ? <img className="rounded-xl mb-8 shadow-xl" alt="header" src={article.image} /> : '' }

    </>
  );
}
