import React, { useEffect, useState } from 'react';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentArticle, prioritize } from '../../../../../../store/articleSlice';

function PrioritizeArticle() {
  const article = useSelector(selectCurrentArticle);

  const [prioritized, setPriority] = useState(false);

  const dispatch = useDispatch();

  const prioritizeArticle = () => {
    dispatch(prioritize(article));
    setPriority(!prioritized);
  };

  useEffect(() => {
    if (article && article.prioritizedAt) setPriority(true);
  }, []);

  return (
    <>
      <button title={`${!prioritized ? 'Prioritize' : 'Lower priority of'} this article`} id="prioritizeArticle" onClick={prioritizeArticle} type="button" className="block w-16 h-16 focus:outline-none hover:text-blue-600">
        { prioritized
          ? <LowPriorityIcon className="text-red-500" />
          : <PriorityHighIcon />}
      </button>
    </>
  );
}

export default PrioritizeArticle;
