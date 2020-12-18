/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import NewTagForm from './NewTagForm';

function NewTag() {
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const toggleAddTagDropdown = () => setShowTagDropdown(!showTagDropdown);
  const addTagRef = useOnclickOutside(() => {
    setShowTagDropdown(false);
  });

  return (
    <>
      <button ref={addTagRef} onClick={() => toggleAddTagDropdown()} type="button" className={`focus:outline-none ${showTagDropdown && 'text-blue-600'} w-8 h-8 text-center float-right mr-4 hover:text-blue-600`}>
        <AddCircleOutlineRoundedIcon fontSize="large" />
      </button>
      { showTagDropdown && <NewTagForm reference={addTagRef} /> }
    </>
  );
}

export default NewTag;
