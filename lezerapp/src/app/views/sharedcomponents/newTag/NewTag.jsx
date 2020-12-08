/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import AddIcon from '@material-ui/icons/Add';
import NewTagForm from './NewTagForm';

function NewTag() {
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const toggleAddTagDropdown = () => setShowTagDropdown(!showTagDropdown);
  const addTagRef = useOnclickOutside(() => {
    setShowTagDropdown(false);
  });

  return (
    <>
      <button ref={addTagRef} onClick={() => toggleAddTagDropdown()} type="button" className={`${showTagDropdown ? 'text-blue-600' : ''} rounded-full bg-gray-200 w-8 h-8 text-center focus:outline-none float-right mr-4 hover:text-blue-600`}><AddIcon /></button>
      { showTagDropdown
        ? <NewTagForm reference={addTagRef} /> : null}
    </>
  );
}

export default NewTag;
