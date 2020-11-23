import React from 'react';

import TagList from '../tagList/TagList';

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

        <TagList />
      </div>
    </section>
  );
}

export default Nav;
