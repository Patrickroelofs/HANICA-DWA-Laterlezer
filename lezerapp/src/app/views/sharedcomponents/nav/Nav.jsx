import React from 'react';
import {
  Link, useParams, useHistory, useLocation,
} from 'react-router-dom';
import ArchiveIcon from '@material-ui/icons/Archive';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { useDispatch } from 'react-redux';
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
          <li className={`hover:bg-gray-100 p-3 ${!status ? 'bg-gray-200 font-bold' : null} align-middle`}>
            <AllInboxIcon className="opacity-60 mr-4 align-middle" />
            All
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
      <div className="mx-4 mb-4 mt-6 pl-2 font-bold text-base">
        <span>
          Added:
        </span>
        <select disabled={staticTags} onChange={selectTimerange} className="focus:ring-indigo-500 focus:border-indigo-500 h-10 px-5 ml-3 pr-10 rounded-full text-sm">
          <option selected={!range} value="">All</option>
          <option selected={range === 'today'} value="today">Today</option>
          <option selected={range === 'week'} value="week">This week</option>
          <option selected={range === 'month'} value="month">This month</option>
          <option selected={range === 'year'} value="year">This year</option>
        </select>
      </div>
      <hr />
      <div className="mx-4">
        <TagHierarchy isStatic={staticTags} />
      </div>
    </section>
  );
}

export default Nav;
