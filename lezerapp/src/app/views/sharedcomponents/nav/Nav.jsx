import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ArchiveIcon from '@material-ui/icons/Archive';
import TodayIcon from '@material-ui/icons/Today';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { useDispatch } from 'react-redux';
import TagHierarchy from '../../library/components/tagHierarchy/TagHierarchy';
import { setSelectedTags } from '../../../../store/tagSlice';

function Nav() {
  const { status } = useParams();
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setSelectedTags([]));
  };

  return (
    <section id="navList" className="font-sans text-base">
      <ul>
        <Link to="/app" onClick={clickHandler}>
          <li className={`hover:bg-gray-100 p-3 ${!status ? 'bg-gray-200 font-bold' : null} align-middle`}>
            <AllInboxIcon className="opacity-60 mr-4 align-middle" />
            All
          </li>
        </Link>
        <Link to="/app/status/today" onClick={clickHandler}>
          <li className={`hover:bg-gray-100 p-3 ${status === 'today' ? 'bg-gray-200 font-bold' : null} align-middle`}>
            <TodayIcon className="opacity-60 mr-4 align-middle" />
            Today
          </li>
        </Link>
        <Link to="/app/status/archived" onClick={clickHandler}>
          <li className={`hover:bg-gray-100 p-3 ${status === 'archived' ? 'bg-gray-200 font-bold' : null} align-middle`}>
            <ArchiveIcon className="opacity-60 mr-4 align-middle" />
            Archived
          </li>
        </Link>
      </ul>
      <hr />
      <div className="mx-4">
        <TagHierarchy />
      </div>
    </section>
  );
}

export default Nav;
