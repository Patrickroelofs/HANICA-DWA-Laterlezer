/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from 'react-cool-onclickoutside';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { selectCurrentArticle, setCurrentArticle } from '../../../../../../store/articleSlice';
import TagListSelect from '../../tagListSelect/TagListSelect';

function AddTagToArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const article = useSelector(selectCurrentArticle);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const toggleTagDropdown = () => setIsTagDropdownOpen(!isTagDropdownOpen);
  const tagRef = useOnClickOutside(() => {
    setIsTagDropdownOpen(false);
  });

  return (
    <>
      <button id="addTagsToArticle" ref={tagRef} onClick={() => toggleTagDropdown()} type="button" className={`${isTagDropdownOpen ? 'text-blue-600' : ''} block w-16 h-16 focus:outline-none hover:text-blue-600`}><LocalOfferIcon /></button>
      { isTagDropdownOpen
        ? (
          <div ref={tagRef} id="tagSelectPopup" className="absolute flex top-12 p-4 bg-white shadow-lg rounded-lg">
            <TagListSelect
              initSelectedTags={article.tags}
              url={`http://localhost:3000/api/articles/${id}`}
              onSubmit={({ data }) => dispatch(setCurrentArticle(data))}
            />
          </div>
        )
        : null}
    </>
  );
}

export default AddTagToArticle;
