/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { selectCurrentArticle } from '../../../../../../store/articleSlice';

function ArchiveArticle() {
  const article = useSelector(selectCurrentArticle);
  const [archived, setArchived] = useState(false);

  const archive = () => {
    axios.post(`http://localhost:3000/api/articles/${article._id}/status`, {
      archivedAt: (article.archivedAt) ? null : moment().toISOString(),
    }).then(() => {
      setArchived(!archived);
    });
  };

  useEffect(() => {
    if (article && article.archivedAt) setArchived(true);
  }, []);

  return (
    <>
      <button title={`${archived ? 'Archive' : 'Unarchive'} this article`} id="archiveArticle" onClick={() => archive()} type="button" className="block w-16 h-16 focus:outline-none hover:text-blue-600">
        { archived
          ? <UnarchiveIcon className="text-red-500" />
          : <ArchiveIcon />}
      </button>
    </>
  );
}

export default ArchiveArticle;
