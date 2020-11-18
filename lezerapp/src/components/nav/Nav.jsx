import React from 'react';
import './nav.scss';

import { TagList } from '../tagList/TagList'

export const Nav = () => {
  return (
    <section id="navList">
      <div>
        <ul class="navlinks">
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

        <TagList></TagList>
      </div>
    </section>
  );
};
