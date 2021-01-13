/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from 'react-cool-onclickoutside';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { selectCurrentArticle, setCurrentArticle } from '../../../../../../store/articleSlice';
import TagListSelect from '../../tagListSelect/TagListSelect';

function AddTagToArticle() {
  const dispatch = useDispatch();

  const article = useSelector(selectCurrentArticle);

  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const tagRef = useOnClickOutside(() => {
    setIsTagDropdownOpen(false);
  });

  return (
    <>
      <button title="Edit tags of article" id="addTagsToArticle" ref={tagRef} onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)} type="button" className={`${isTagDropdownOpen && 'text-blue-600'} block w-16 h-16 focus:outline-none hover:text-blue-600`}>
        <LocalOfferIcon />
      </button>
      { isTagDropdownOpen
        && (
          <div ref={tagRef} id="tagSelectPopup" className="absolute flex top-12 p-4 bg-white shadow-lg rounded-lg">
            <TagListSelect
              initSelectedTags={article.tags}
              onSubmit={({ data }) => dispatch(setCurrentArticle(data))}
            />
          </div>
        )}
    </>
  );
}

export default AddTagToArticle;
