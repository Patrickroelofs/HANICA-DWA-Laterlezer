import React from 'react';
import TagList from '../tagList/TagList';
import NewTag from '../newTag/NewTag';

function Nav() {
  return (
    <section id="navList">
      <NewTag />
      <TagList />
    </section>
  );
}

export default Nav;
