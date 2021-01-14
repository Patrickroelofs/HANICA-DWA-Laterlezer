import React, { useEffect, useState } from 'react';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentArticle, archive } from '../../../../../../store/articleSlice';

function ArchiveArticle() {
  const article = useSelector(selectCurrentArticle);

  const [archived, setArchived] = useState(false);

  const dispatch = useDispatch();

  const archiveArticle = () => {
    dispatch(archive(article));
    setArchived(!archived);
  };

  useEffect(() => {
    if (article && article.archivedAt) setArchived(true);
  }, []);

  return (
    <>
      <button title={`${archived ? 'Archive' : 'Unarchive'} this article`} id="archiveArticle" onClick={archiveArticle} type="button" className="block w-16 h-16 focus:outline-none hover:text-blue-600">
        { archived
          ? <UnarchiveIcon className="text-red-500" />
          : <ArchiveIcon />}
      </button>
    </>
  );
}

export default ArchiveArticle;
