import React from 'react';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import { useDispatch } from 'react-redux';
import { deleteTag } from '../../../../../../store/tagSlice';
import setContrast from '../../../../../../utils/chromaContrast';

export default ({
  tag, selectTag, handleClick, selectedTags, isStatic,
}) => {
  const isSelected = (tagg) => selectedTags.find((t) => tagg._id.toString() === t._id.toString());
  const dispatch = useDispatch();

  const handleTagClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectTag(tag);
  };
  return (
    <li
      key={tag._id}
      className={`relative transform ${isStatic === false ? 'hover:scale-105 hover:bg-gray-100' : ''} motion-reduce:transform-none transition-transform rounded-lg my-1 ${isSelected(tag) && 'bg-gray-200'}`}
    >
      <button type="button" onClick={handleTagClick} className={`group px-4 py-2 focus:outline-none ${isStatic ? 'cursor-default' : ''} w-full text-left`}>
        <span
          className="w-6 h-6 inline-block rounded-full align-middle mr-2"
          style={{ background: tag.color, color: setContrast(tag.color) }}
        />
        {tag.title}
        <div className="absolute right-0 top-2">
          <button
            className="ml-1 focus:outline-none opacity-0 hover:text-blue-600 group-hover:opacity-100 w-6 h-6 float-right "
            type="submit"
            onClick={(e) => handleClick(tag, e, 'edit')}
          >
            <EditRoundedIcon fontSize="small" />
          </button>
          <button
            className="ml-1 focus:outline-none opacity-0 hover:text-green-600 group-hover:opacity-100 w-6 h-6 float-right"
            type="submit"
            onClick={(e) => handleClick(tag, e, 'add')}
          >
            <AddCircleOutlineRoundedIcon />
          </button>
          <button
            className="ml-1 focus:outline-none opacity-0 hover:text-red-600 group-hover:opacity-100 w-6 h-6 float-right"
            type="submit"
            onClick={() => dispatch(deleteTag(tag))}
          >
            <RemoveCircleOutlineRoundedIcon />
          </button>
        </div>
      </button>
    </li>
  );
};
