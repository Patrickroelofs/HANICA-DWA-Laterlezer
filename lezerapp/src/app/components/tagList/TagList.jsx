import React from 'react';
import NewTag from '../newTag/NewTag';

function TagList() {
  return (
    <ul id="compositions-list" className="pure-tree main-tree">
      <NewTag />
    </ul>
  );
}

export default TagList;
