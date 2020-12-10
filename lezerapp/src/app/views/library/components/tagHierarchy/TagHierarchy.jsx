import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'axios';
import useOnclickOutside from 'react-cool-onclickoutside';
import NewTag from '../../../sharedcomponents/newTag/NewTag';
import TagItem from './components/TagItem';
import {
  setTags, selectTags, selectSelectedTags, setSelectedTags,
} from '../../../../../store/tagSlice';
import 'react-contexify/dist/ReactContexify.css';
import NewTagForm from '../../../sharedcomponents/newTag/NewTagForm';

const TagHierarchy = () => {
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

  const handleClick = (e) => {
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
      const result = [(<TagItem tag={t} handleClick={handleClick} selectTag={selectTag} selectedTags={selectedTags} />)];
      if (t.children) {
        result.push(<ul className="border-l-2 inset border-gray-300 border-solid ml-4">{tagHierarchyGenerator(t.children)}</ul>);
      }
      return result;
    });
    return tagz;
  };

  return (
    <>
      <div className="mb-4 mt-6 pl-2 font-bold text-base">
        <span>Tags</span>
        { showTagDropdown && <NewTagForm reference={addTagRef} tag={clickedTagTitle} /> }
        <NewTag />
      </div>
      <ul id="compositions-list" className="pure-tree main-tree">
        {tagHierarchyGenerator(tags)}
      </ul>
    </>
  );
};

export default memo(TagHierarchy);
