import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'axios';
import useOnclickOutside from 'react-cool-onclickoutside';
import NewTag from '../../../sharedcomponents/newTag/NewTag';
import TagItem from './components/TagItem';
import {
  setTags, selectTags, selectSelectedTags, setSelectedTags, deleteTag,
} from '../../../../../store/tagSlice';
import NewTagForm from '../../../sharedcomponents/newTag/NewTagForm';

const TagHierarchy = ({ isStatic = false }) => {
  const tags = useSelector(selectTags);
  const selectedTags = useSelector(selectSelectedTags);

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

  const selectTag = (tagss) => {
    if (!isStatic) {
      if (isSelected(tagss[0])) {
        const childrenIds = (tag) => tag.children.map((t) => [
          t._id,
          ...childrenIds(t),
        ]).flat();
        const childIds = childrenIds(tagss[0]);
        const parentIds = tagss.filter((tag) => {
          const hasSelectedChild = childrenIds(tag).filter((id) => {
            if (!tagss.find((selTag) => id === selTag._id) && !childIds.includes(id)) {
              return selectedTags.find((selTag) => id === selTag._id.toString());
            }
            return false;
          });
          return hasSelectedChild.length === 0;
        }).map((tag) => tag._id.toString());
        const ids = [...childIds, ...parentIds];
        dispatch(setSelectedTags(selectedTags.filter((t) => !ids.includes(t._id))));
      } else {
        dispatch(setSelectedTags([
          ...selectedTags,
          ...tagss,
        ]));
      }
    }
  };

  const deleteClickedTag = (tag) => {
    selectTag([tag]);
    dispatch(deleteTag(tag));
  };

  useEffect(() => {
    get('http://localhost:3000/api/tags').then(({ data }) => {
      dispatch(setTags(data.data));
    });
  }, [setTags]);

  const tagHierarchyGenerator = (tagz, pickedTag) => {
    tagz = tagz.map((t) => {
      const onClick = (parents) => {
        parents.push(t);
        pickedTag(parents);
      };
      const result = [(<TagItem tag={t} key={`tags${t._id}`} handleClick={handleClick} isStatic={isStatic} selectTag={() => onClick([])} selectedTags={selectedTags} editable={t.editable} deleteTag={deleteClickedTag} />)];
      if (t.children) {
        result.push(<li data-key={`tags${t._id}chld`} key={`tags${t._id}chld`}><ul className="border-l-2 inset border-gray-300 border-solid ml-4">{tagHierarchyGenerator(t.children, onClick)}</ul></li>);
      }
      return result;
    });
    return tagz;
  };

  const renderParents = () => tags.map((t) => {
    const onClick = (parents) => {
      parents.push(t);
      selectTag(parents);
    };
    const result = [(<TagItem key={`tags${t._id}`} tag={t} handleClick={handleClick} isStatic={isStatic} selectTag={() => onClick([])} selectedTags={selectedTags} editable={t.editable} deleteTag={deleteClickedTag} />)];
    if (t.children) {
      result.push(<li data-key={`tags${t._id}chld`} key={`tags${t._id}chld`}><ul className="border-l-2 inset border-gray-300 border-solid ml-4">{tagHierarchyGenerator(t.children, onClick)}</ul></li>);
    }
    return result;
  });

  return (
    <>
      <div className="mb-4 mt-6 pl-2 font-bold text-base">
        <span>Tags</span>
        { showTagDropdown && <NewTagForm reference={addTagRef} parent={parentTag} tag={clickedTag} mode={mode} position={position} /> }
        <NewTag />
      </div>
      <ul id="compositions-list" className="pure-tree main-tree">
        {renderParents()}
      </ul>
    </>
  );
};

export default memo(TagHierarchy);
