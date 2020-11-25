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

  const changeColor = (e, tag) => {
    e.preventDefault();
    console.log('yep');
    e.target.style.background = chromaConversion(tag.color);
  };

  const tags = useSelector((state) => state.tags);

  const tagList = tags.tags.map((tag, index) => (
    <li key={tag.title}>
      <label htmlFor={`Tag-${index}`} className="px-4 py-2 block cursor-pointer">
        <span className="w-6 h-6 inline-block rounded-full align-middle mr-2" style={{ background: tag.color, color: chromaConversion(tag.color) }} />
        <input onClick={(e) => changeColor.bind(e, tag)} className="hidden" type="checkbox" id={`Tag-${index}`} />
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
