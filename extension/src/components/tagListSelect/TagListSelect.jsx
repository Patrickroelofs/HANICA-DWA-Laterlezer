import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TagPill from '../tagPill/TagPill';
import TagParent from './tagParent/TagParent';

function TagListSelect({ onSave }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchTags = () => {
    axios.get('http://localhost:3000/api/tags', {
      headers: {
        Username: localStorage.getItem('username'),
      },
    }).then(({ data }) => {
      const mapTags = (defTags) => defTags.map((tag) => ({
        _id: tag._id,
        title: tag.title,
        value: tag.title,
        label: tag.title,
        color: tag.color,
        children: mapTags(tag.children),
      }));
      setTags(mapTags(data.data));
    });
  };

  const postTags = () => onSave(selectedTags);

  const isSelected = (tag) => selectedTags.find((t) => tag._id.toString() === t._id.toString());

  const selectTags = (selTags) => {
    if (isSelected(selTags[0])) {
      const childrenIds = (tag) => tag.children.map((t) => [
        t._id,
        ...childrenIds(t),
      ]).flat();
      const childIds = childrenIds(selTags[0]);
      const parentIds = selTags.filter((tag) => {
        const hasSelectedChild = childrenIds(tag).filter((id) => {
          if (!selTags.find((selTag) => id === selTag._id) && !childIds.includes(id)) {
            return selectedTags.find((selTag) => id === selTag._id.toString());
          }
          return false;
        });
        return hasSelectedChild.length === 0;
      }).map((tag) => tag._id.toString());
      const ids = [...childIds, ...parentIds];
      setSelectedTags(selectedTags.filter((t) => !ids.includes(t._id.toString())));
    } else {
      setSelectedTags([
        ...selectedTags,
        ...selTags.filter((tag) => !isSelected(tag)),
      ]);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <>

      {tags.map((tag) => (tag.children.length > 0
        ? <TagParent parent={tag} isSelected={isSelected} onClick={selectTags} />
        : (
          <button
            type="button"
            key={tag._id}
            className={`mr-1 mt-1 focus:outline-none ${isSelected(tag) ? '' : 'opacity-20'}`}
            onClick={() => selectTags([tag])}
            value={tag._id}
          >
            <TagPill data={tag} />
          </button>
        )))}

      <div className="sticky fixed bottom-24 float-right">
        <button
          id="saveTagsToArticle"
          type="submit"
          onClick={() => postTags()}
          className="mt-2 mx-auto block h-9 px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          Save Article
        </button>
      </div>

    </>
  );
}

export default TagListSelect;
