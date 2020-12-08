import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'axios';
import { useContextMenu, Menu, Item } from 'react-contexify';
import useOnclickOutside from 'react-cool-onclickoutside';
import NewTag from '../../../sharedcomponents/newTag/NewTag';
import setContrast from '../../../../../utils/chromaContrast';
import {
  setTags, selectTags, selectSelectedTags, setSelectedTags,
} from '../../../../../store/tagSlice';
import 'react-contexify/dist/ReactContexify.css';
import NewTagForm from '../../../sharedcomponents/newTag/NewTagForm';

function TagList() {
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const toggleAddTagDropdown = () => setShowTagDropdown(!showTagDropdown);
  const dispatch = useDispatch();
  const [clickedTag, setClickedTag] = useState();

  const selectedTags = useSelector(selectSelectedTags);
  const tags = useSelector(selectTags);

  const addTagRef = useOnclickOutside(() => {
    setShowTagDropdown(false);
    setClickedTag('');
  });

  const { show } = useContextMenu({
    id: 'tagMenu',
  });

  function displayTagMenu(e) {
    show(e);
  }

  const handleClick = (e) => {
    console.log(e.triggerEvent.target.innerText);
    setClickedTag(e.triggerEvent.target.innerText);
    toggleAddTagDropdown();
  };

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
    get('http://localhost:3000/api/tags').then(({ data }) => {
      dispatch(setTags(data.data));
    });
  }, [setTags]);

  const tagList = tags
    .filter((t) => t.parents.length <= 0)
    .map((tag, index) => (
      <li onContextMenu={displayTagMenu} key={tag.title} className={`transform hover:scale-105 hover:bg-gray-100 motion-reduce:transform-none transition-transform rounded-lg my-1 ${selectedTags.includes(tag.title) ? 'bg-gray-200' : null}`}>
        <label htmlFor={`Tag-${index}`} className="px-4 py-2 block cursor-pointer">
          <span className="w-6 h-6 inline-block rounded-full align-middle mr-2" style={{ background: tag.color, color: setContrast(tag.color) }} />
          <input onChange={selectTag} value={tag.title} hidden type="checkbox" checked={selectedTags.includes(tag.title)} id={`Tag-${index}`} />
          {tag.title}
        </label>
      </li>
    ));
  return (
    <>
      <div className="mb-4 mt-6 pl-2 font-bold text-base">
        <span>Tags</span>
        { showTagDropdown ? <NewTagForm reference={addTagRef} tag={clickedTag} /> : null }
        <NewTag />
      </div>
      <Menu id="tagMenu">
        <Item onClick={(e) => handleClick(e)}>Add subtag</Item>
      </Menu>
      <ul id="compositions-list" className="pure-tree main-tree">
        {tagList}
      </ul>
    </>
  );
}

export default TagList;
