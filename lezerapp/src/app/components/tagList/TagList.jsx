import React from 'react';
import { useSelector } from 'react-redux';
import chroma from 'chroma-js';

function TagList() {
  const chromaConversion = (color) => {
    if (chroma.contrast(color, 'white') > 2) {
      return 'white';
    }
    return 'black';
  };

  const tags = useSelector((state) => state.tags);

  const tagList = tags.tags.map((tag, index) => (
    <li key={tag.title}>
      <label htmlFor={`Tag-${index}`} style={{ background: tag.color, color: chromaConversion(tag.color) }} className="p-2 block">
        <input className="align-middle mr-2 inline-block" type="checkbox" id={`Tag-${index}`} />
        {tag.title}
      </label>
    </li>
  ));

  return (
    <ul id="compositions-list" className="pure-tree main-tree">
      <h4 className="mb-2 pl-2 font-bold text-base">Tags</h4>
      {tagList}
    </ul>
  );
}

export default TagList;
