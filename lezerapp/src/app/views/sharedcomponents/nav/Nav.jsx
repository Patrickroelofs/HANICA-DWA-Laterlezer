import React from 'react';
import TagList from '../../library/components/tagList/TagList';
import NewTag from '../newTag/NewTag';

function Nav() {
  return (
    <section id="navList" className="font-sans text-base mx-4">
      <NewTag />
      <TagList />
    </section>
  );
}

export default Nav;
