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
  selectTag,
} from '../../../../../store/tagSlice';

export default function ArticleHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const article = useSelector(selectCurrentArticle);
  const selectedTags = useSelector(selectSelectedTags);
  const [previouslySelectedTags, setPreviouslySelectedTags] = useState([]);

  const clickHandler = (tag) => {
    history.goBack();
    dispatch(selectTag(tag));
  };

  useEffect(() => {
    setPreviouslySelectedTags(selectedTags);
    dispatch(setArticleTags(article.tags.map((tag) => tag.title)));
    dispatch(setSelectedTags(article.tags));
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
        <button type="button" id="backButton" className="focus:outline-none" onClick={goBack}>
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
      { article.author !== null || article.published !== null
        ? (
          <small className="text-md italic pb-4 block">
            { article.author }
              &nbsp;
            { article.published && 'published on' }
              &nbsp;
            { article.published !== null
              && moment(article.published).format('DD-MM-YYYY')}
          </small>
        ) : null }
      <div>
        {
          article.html && article.image !== null && !article.html.includes(article.image)
            && <img className="rounded-xl mb-8 shadow-xl m-auto" alt="news" src={article.image} />
        }
      </div>
    </>
  );
}
