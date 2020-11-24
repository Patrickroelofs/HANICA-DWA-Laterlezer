import React from 'react';
import { useSelector } from 'react-redux';

function TagList() {
  const tags = useSelector((state) => state.tags);

  const tagList = tags.tags.map((tag, index) => (
    <li key={tag.title}>
      <label htmlFor={`Tag-${index}`} style={{ color: tag.color }}>
        {tag.title}
        <input type="checkbox" id={`Tag-${index}`} />
      </label>
    </li>
  ));

  return (
    <ul id="compositions-list" className="pure-tree main-tree">
      <h4>Tags</h4>
      {tagList}
    </ul>
  );
}

export default TagList;
