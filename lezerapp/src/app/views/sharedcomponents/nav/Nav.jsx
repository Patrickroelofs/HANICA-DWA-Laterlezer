import React from 'react';
import TagHierarchy from '../../library/components/tagHierarchy/TagHierarchy';
// import TagList from '../../library/components/tagList/TagList';

function Nav() {
  return (
    <section id="navList" className="font-sans text-base mx-4">
      <TagHierarchy />
    </section>
  );
}

export default Nav;
