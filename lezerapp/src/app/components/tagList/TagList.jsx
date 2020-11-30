import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'axios';
import setContrast from '../../../utils/chromaContrast';
import { setTags, selectTags } from '../../../store/tagSlice';

function TagList() {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);

  const changeColor = (e, tag) => {
    e.preventDefault();
    e.target.style.background = setContrast(tag.color);
  };

  useEffect(() => {
    get('http://localhost:3000/api/tags').then(({ data }) => {
      dispatch(setTags(data.data));
    });
  }, [setTags]);

  const tagList = tags.map((tag, index) => (
    <li key={tag.title}>
      <label htmlFor={`Tag-${index}`} className="px-4 py-2 block cursor-pointer">
        <span className="w-6 h-6 inline-block rounded-full align-middle mr-2" style={{ background: tag.color, color: setContrast(tag.color) }} />
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
