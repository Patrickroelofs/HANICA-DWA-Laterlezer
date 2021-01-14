import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnclickOutside from 'react-cool-onclickoutside';
import NewTag from '../../../sharedcomponents/newTag/NewTag';
import {
  getTags, selectTags, selectSelectedTags, selectTag, deselectTag, getTagClasses,
} from '../../../../../store/tagSlice';
import NewTagForm from '../../../sharedcomponents/newTag/NewTagForm';
import TagItem from './components/TagItem';

const TagHierarchy = ({ isStatic = false }) => {
  const tags = useSelector(selectTags);
  const selectedTags = useSelector(selectSelectedTags);
  const getClasses = useSelector(getTagClasses);

  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [clickedTag, setClickedTag] = useState();
  const [parentTag, setParentTag] = useState();
  const [mode, setMode] = useState();
  const [position, setPosition] = useState();

  const dispatch = useDispatch();

  const addTagRef = useOnclickOutside(() => {
    setShowTagDropdown(false);
    setClickedTag('');
    setParentTag('');
  });

  const handleClick = (tag, e, m) => {
    e.preventDefault();
    e.stopPropagation();
    switch (m) {
      case 'edit':
        setMode(m);
        setClickedTag(tag);
        break;
      case 'add':
        setMode(m);
        setParentTag(tag);
        break;
      default:
        break;
    }
    setPosition({ x: e.clientX, y: e.clientY });
    setShowTagDropdown(!showTagDropdown);
  };

  const isSelected = (tag) => selectedTags.find((t) => tag._id.toString() === t._id.toString());

  const handleTag = (tag) => {
    if (!isStatic) {
      if (isSelected(tag)) {
        dispatch(deselectTag(tag));
      } else {
        dispatch(selectTag(tag));
      }
    }
  };

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const generateList = (tagss) => tagss.map((tag) => {
    const result = [(<TagItem key={`tags${tag._id}`} tag={tag} handleClick={handleClick} isStatic={isStatic} selectTag={() => handleTag(tag)} classes={getClasses(tag, isStatic)} editable={tag.editable} />)];
    if (tag.children && tag.children.length > 0) {
      result.push(<li key={`tags${tag._id}chld`}><ul className="border-l-2 inset border-gray-300 border-solid ml-4">{generateList(tag.children)}</ul></li>);
    }
    return result;
  });

  return (
    <>
      <span className="bg-gray-200 font-bold hidden" />
      <div className="mb-4 mt-6 pl-2 font-bold text-base">
        <span>Tags</span>
        { showTagDropdown && <NewTagForm reference={addTagRef} parent={parentTag} tag={clickedTag} mode={mode} position={position} toggle={() => setShowTagDropdown(!showTagDropdown)} /> }
        <NewTag />
      </div>
      <ul id="compositions-list" className="pure-tree main-tree">
        {generateList(tags)}
      </ul>
    </>
  );
};

export default memo(TagHierarchy);
