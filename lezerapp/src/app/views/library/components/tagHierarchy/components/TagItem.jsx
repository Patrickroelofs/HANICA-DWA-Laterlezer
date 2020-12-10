import React from 'react';
import setContrast from '../../../../../../utils/chromaContrast';

export default ({
  tag, selectTag, handleClick, selectedTags,
}) => (
  <li id={`${tag}`} key={tag._id} className={`transform hover:scale-105 hover:bg-gray-100 motion-reduce:transform-none transition-transform rounded-lg my-1 ${selectedTags.includes(tag.title) ? 'bg-gray-200' : null}`}>
    <label htmlFor={`Tag-${tag._id}`} className="group px-4 py-2 block cursor-pointer">
      <span className="w-6 h-6 inline-block rounded-full align-middle mr-2" style={{ background: tag.color, color: setContrast(tag.color) }} />
      <input onChange={selectTag} value={tag.title} hidden type="checkbox" id={`Tag-${tag._id}`} />
      {tag.title}
      <button className="opacity-0 group-hover:opacity-100 w-6 h-6 float-right bg-gray-200 rounded-full" type="submit" onClick={() => handleClick(tag)}>+</button>
    </label>
  </li>
);
