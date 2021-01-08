import React from 'react';
import {
  Link, useParams, useHistory, useLocation,
} from 'react-router-dom';
import ArchiveIcon from '@material-ui/icons/Archive';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { useDispatch } from 'react-redux';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import TagHierarchy from '../../library/components/tagHierarchy/TagHierarchy';
import { setSelectedTags } from '../../../../store/tagSlice';
import { useQuery } from '../../../../utils/helpers';

function Nav({ staticTags = false }) {
  const history = useHistory();
  const { status } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const range = useQuery().get('range');

  const clickHandler = () => {
    dispatch(setSelectedTags([]));
  };

  const selectTimerange = (e) => {
    const selRange = e.target.value;
    history.push(`${location.pathname}${selRange ? `?range=${selRange}` : ''}`);
  };

  return (
    <section id="navList" className="font-sans text-base">
      <ul>
        <Link to="/app" onClick={clickHandler}>
          <li className={`hover:bg-gray-100 p-3 ${!status && 'bg-gray-200 font-bold'} align-middle`}>
            <AllInboxIcon className="opacity-60 mr-4 align-middle" />
            All
          </li>
        </Link>
        <Link to="/app/status/archived" onClick={clickHandler}>
          <li className={`hover:bg-gray-100 p-3 ${status === 'archived' && 'bg-gray-200 font-bold'} align-middle`}>
            <ArchiveIcon className="opacity-60 mr-4 align-middle" />
            Archived
          </li>
        </Link>
        <Link to="/app/status/priority" onClick={clickHandler}>
          <li className={`hover:bg-gray-100 p-3 ${status === 'priority' && 'bg-gray-200 font-bold'} align-middle`}>
            <PriorityHighIcon className="opacity-60 mr-4 align-middle" />
            Priority
          </li>
        </Link>
      </ul>
      <hr />
      <div className="mx-4 mb-4 mt-6 pl-2 font-bold text-base">
        <span>
          Added:
        </span>
        <select value={range || ''} disabled={staticTags} onChange={selectTimerange} className="focus:ring-indigo-500 focus:border-indigo-500 h-10 px-5 ml-3 pr-10 rounded-full text-sm">
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
          <option value="year">This year</option>
        </select>
      </div>
      <hr />
      <div className="pl-4 pb-16 overflow-y-scroll overflow-x-hidden" style={{ height: 'calc(100vh - 232px)' }}>
        <TagHierarchy isStatic={staticTags} />
      </div>
    </section>
  );
}

export default Nav;
