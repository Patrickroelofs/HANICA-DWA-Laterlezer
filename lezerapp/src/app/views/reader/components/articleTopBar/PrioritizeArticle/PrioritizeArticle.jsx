/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { selectCurrentArticle } from '../../../../../../store/articleSlice';

function PrioritizeArticle() {
  const article = useSelector(selectCurrentArticle);
  const [priority, setPriority] = useState(false);

  const archive = () => {
    axios.post(`http://localhost:3000/api/articles/${article._id}/status`, {
      prioritizedAt: (article.prioritizedAt) ? null : moment().toISOString(),
    }).then(() => {
      setPriority(!priority);
    });
  };

  useEffect(() => {
    if (article.prioritizedAt) setPriority(true);
  }, []);

  return (
    <>
      <button id="archiveArticle" onClick={() => archive()} type="button" className="block w-16 h-16 focus:outline-none hover:text-blue-600">
        { priority
          ? <LowPriorityIcon className="text-red-500" />
          : <PriorityHighIcon />}
      </button>
    </>
  );
}

export default PrioritizeArticle;
