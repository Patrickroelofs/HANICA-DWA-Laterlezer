import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import { useDispatch } from 'react-redux';
import { deleteTag } from '../../../../../../store/tagSlice';
import setContrast from '../../../../../../utils/chromaContrast';

export default ({
  tag, selectTag, handleClick, selectedTags,
}) => {
  const isSelected = (tagg) => selectedTags.find((t) => tagg._id.toString() === t._id.toString());
  const dispatch = useDispatch();

  const handleDelete = (deletingTag) => {
    dispatch(deleteTag(deletingTag));
  };

  return (
    <li
      key={tag._id}
      className={`transform hover:scale-105 hover:bg-gray-100 motion-reduce:transform-none transition-transform rounded-lg my-1 ${isSelected(tag) && 'bg-gray-200'}`}
    >
      <button type="button" onClick={() => selectTag(tag)} className="group px-4 py-2 focus:outline-none cursor-pointer w-full text-left">
        <span
          className="w-6 h-6 inline-block rounded-full align-middle mr-2"
          style={{ background: tag.color, color: setContrast(tag.color) }}
        />
        {tag.title}
        <button
          className="focus:outline-none opacity-0 group-hover:opacity-100 hover:text-blue-600 w-6 h-6 float-right bg-gray-200 rounded-full"
          type="submit"
          onClick={(e) => handleClick(tag, e)}
        >
          <AddIcon fontSize="small" />
        </button>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          className="focus:outline-none opacity-0 hover:text-red-600 group-hover:opacity-100 w-6 h-6 float-right"
          type="submit"
          onClick={() => handleDelete(tag)}
        >
          <RemoveCircleOutlineRoundedIcon />
        </button>
      </button>
    </li>
  );
};
