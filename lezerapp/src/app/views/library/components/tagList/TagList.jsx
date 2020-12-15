import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'axios';
import NewTag from '../../../sharedcomponents/newTag/NewTag';
import setContrast from '../../../../../utils/chromaContrast';
import {
  setTags, selectTags, selectSelectedTags, setSelectedTags,
} from '../../../../../store/tagSlice';

function TagList() {
  const dispatch = useDispatch();

  const selectedTags = useSelector(selectSelectedTags);
  const tags = useSelector(selectTags);

  const selectTag = (e) => {
    let tagss = [...selectedTags];
    if (e.target.checked) {
      tagss.push(e.target.value);
    } else {
      tagss = selectedTags.filter((t) => t !== e.target.value);
    }
    dispatch(setSelectedTags(tagss));
  };

  useEffect(() => {
    get('http://localhost:3000/api/tags', { withCredentials: true }).then(({ data }) => {
      dispatch(setTags(data.data));
    });
  }, [setTags]);

  const tagList = tags.map((tag, index) => (
    <li key={tag.title} className={`transform hover:scale-105 hover:bg-gray-100 motion-reduce:transform-none transition-transform rounded-lg my-1 ${selectedTags.includes(tag.title) ? 'bg-gray-200' : null}`}>
      <label htmlFor={`Tag-${index}`} className="px-4 py-2 block cursor-pointer">
        <span className="w-6 h-6 inline-block rounded-full align-middle mr-2" style={{ background: tag.color, color: setContrast(tag.color) }} />
        <input onChange={selectTag} value={tag.title} hidden type="checkbox" checked={selectedTags.includes(tag.title)} id={`Tag-${index}`} />
        {tag.title}
      </label>
    </li>
  ));

  return (
    <ul id="compositions-list" className="pure-tree main-tree">
      <div className="mb-4 mt-6 pl-2 font-bold text-base relative">
        <span>Tags</span>
        <NewTag />
      </div>

      {tagList}
    </ul>
  );
}

export default TagList;
