import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentArticle, addTags } from '../../../../../store/articleSlice';
import TagPill from '../../../sharedcomponents/tagPill/TagPill';
import TagParent from './tagParent/TagParent';
import { getTags, selectTags as selectTagsStore, setSelectedTags as setSelectedTagsStore } from '../../../../../store/tagSlice';
import TopDown from '../../../../../store/Classes/TopDown';

function TagListSelect() {
  const article = useSelector(selectCurrentArticle);
  const tags = useSelector(selectTagsStore);

  const dispatch = useDispatch();

  const [selectedTags, setSelectedTags] = useState([]);

  const isSelected = (tag) => selectedTags.find((t) => tag._id.toString() === t._id.toString());

  const selectTags = (selTags) => {
    if (isSelected(selTags[0])) {
      const model = new TopDown(tags, selectedTags);
      setSelectedTags(model.deselectTag(selTags[0]));
    } else {
      setSelectedTags([
        ...selectedTags,
        ...selTags.filter((tag) => !isSelected(tag)),
      ]);
    }
  };

  const submitTags = () => {
    dispatch(setSelectedTagsStore(selectedTags));
    dispatch(addTags(article._id, selectedTags));
  };

  useEffect(() => {
    dispatch(getTags());
  }, []);

  useEffect(() => {
    if (article.tags) {
      setSelectedTags(article.tags);
    }
  }, [article.tags]);

  return (
    <>
      <div className="mx-3">
        {tags.map((tag) => (tag.children.length > 0
          ? <TagParent parent={tag} isSelected={isSelected} onClick={selectTags} />
          : (
            <button
              type="button"
              key={tag._id}
              className={`focus:outline-none ${isSelected(tag) ? '' : 'opacity-20'}`}
              onClick={() => selectTags([tag])}
              value={tag._id}
            >
              <TagPill data={tag} />
            </button>
          )))}
      </div>
      <button
        id="saveTagsToArticle"
        type="submit"
        onClick={submitTags}
        className="inline-block ml-2 h-9 items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        Save
      </button>
    </>
  );
}

export default TagListSelect;
