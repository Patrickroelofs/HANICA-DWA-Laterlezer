import React from 'react';
import { useDispatch } from 'react-redux';
import createTag from './NewTagAction';

function NewTag() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTag(e.target.tagTitle.value, e.target.tagColor.value));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tagTitle">
        Tag title:
        <input type="text" id="tagTitle" name="tagTitle" />
      </label>
      <label htmlFor="tagColor">
        Tag color:
        <input type="text" id="tagColor" name="tagColor" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NewTag;
