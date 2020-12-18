/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import AddIcon from '@material-ui/icons/Add';
import NewTagForm from './NewTagForm';

function NewTag() {
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [position, setPosition] = useState();
  const toggleAddTagDropdown = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setShowTagDropdown(!showTagDropdown);
  };
  const addTagRef = useOnclickOutside(() => {
    setShowTagDropdown(false);
  });

  return (
    <>
      <button ref={addTagRef} onClick={(e) => toggleAddTagDropdown(e)} type="button" className={`focus:outline-none ${showTagDropdown && 'text-blue-600'} rounded-full bg-gray-200 w-8 h-8 text-center float-right mr-4 hover:text-blue-600`}>
        <AddIcon />
      </button>
      { showTagDropdown && <NewTagForm reference={addTagRef} position={position} /> }
    </>
  );
}

export default NewTag;
