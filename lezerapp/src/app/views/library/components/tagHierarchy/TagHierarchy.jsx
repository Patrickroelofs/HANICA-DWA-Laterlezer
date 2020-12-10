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

export default function TagHierarchy() {
  const tags = useSelector(selectTags);

  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const toggleAddTagDropdown = () => setShowTagDropdown(!showTagDropdown);
  const dispatch = useDispatch();
  const [clickedTagTitle, setClickedTag] = useState();

  const selectedTags = useSelector(selectSelectedTags);

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
    console.log(e);
    setClickedTag(e);
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

  const tagHierarchyGenerator = (tagz) => {
    tagz = tagz.map((t) => {
      const result = [(
        <li id={`${t}`} onContextMenu={displayTagMenu} key={t._id} className={`transform hover:scale-105 hover:bg-gray-100 motion-reduce:transform-none transition-transform rounded-lg my-1 ${selectedTags.includes(t.title) ? 'bg-gray-200' : null}`}>
          <label htmlFor={`Tag-${t._id}`} className="group px-4 py-2 block cursor-pointer">
            <span className="w-6 h-6 inline-block rounded-full align-middle mr-2" style={{ background: t.color, color: setContrast(t.color) }} />
            <input onChange={selectTag} value={t.title} hidden type="checkbox" id={`Tag-${t._id}`} />
            {t.title}
            <button className="opacity-0 group-hover:opacity-100 w-6 h-6 float-right bg-gray-200 rounded-full" type="submit" onClick={() => handleClick(t)}>+</button>
          </label>
        </li>)];
      if (t.children) {
        result.push(<ul className="border-l-2 border-gray-400 border-solid ml-4">{tagHierarchyGenerator(t.children)}</ul>);
      }
      return result;
    });
    return tagz;
  };

  return (
    <>
      <div className="mb-4 mt-6 pl-2 font-bold text-base">
        <span>Tags</span>
        { showTagDropdown ? <NewTagForm reference={addTagRef} tag={clickedTagTitle} /> : null }
        <NewTag />
      </div>
      <Menu id="tagMenu">
        <Item onClick={(e) => handleClick(e)}>Add subtag</Item>
      </Menu>
      <ul id="compositions-list" className="pure-tree main-tree">
        {tagHierarchyGenerator(tags)}
      </ul>
    </>
  );
}
