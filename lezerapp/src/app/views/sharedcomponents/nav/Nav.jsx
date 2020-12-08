import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TagList from '../../library/components/tagList/TagList';

function Nav() {
  const { status } = useParams();

  return (
    <section id="navList" className="font-sans text-base">
      <ul>
        <Link to="/app">
          <li className={`hover:bg-gray-100 p-3 ${!status ? 'bg-gray-200' : null}`}>
            All
          </li>
        </Link>
        <Link to="/app/status/today">
          <li className={`hover:bg-gray-100 p-3 ${status === 'today' ? 'bg-gray-200' : null}`}>
            Today
          </li>
        </Link>
        <Link to="/app/status/archived">
          <li className={`hover:bg-gray-100 p-3 ${status === 'archived' ? 'bg-gray-200' : null}`}>
            Archived
          </li>
        </Link>
      </ul>
      <hr />
      <div className="mx-4">
        <TagList />
      </div>
    </section>
  );
}

export default Nav;
