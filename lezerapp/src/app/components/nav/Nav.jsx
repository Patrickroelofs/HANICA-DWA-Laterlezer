import React from 'react';
import './nav.scss';

import TagList from '../tagList/TagList';
import NewTag from '../newTag/NewTag';

function Nav() {
  return (
    <section id="navList">
      <div>
        <ul className="navlinks">
          <li>
            <a href="index.html">New</a>
          </li>
          <li>
            <a href="index.html">Favorites</a>
          </li>
          <li>
            <a href="index.html">Read Later</a>
          </li>
        </ul>

        <NewTag />
        <TagList />
      </div>
    </section>
  );
}

export default Nav;
