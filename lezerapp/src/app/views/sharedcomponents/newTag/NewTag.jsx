/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';
import useOnclickOutside from 'react-cool-onclickoutside';
import chroma from 'chroma-js';
import AddIcon from '@material-ui/icons/Add';
import { createTag } from '../../../../store/tagSlice';
import setContrast from '../../../../utils/chromaContrast';

function NewTag() {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(chroma.random().hex());
  const [showPicker, setShowPicker] = useState(false);
  const [response, setResponse] = useState({});
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const toggleAddTagDropdown = () => setShowTagDropdown(!showTagDropdown);
  const addTagRef = useOnclickOutside(() => {
    setShowTagDropdown(false);
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTag(title, chroma(color).hex())).then((res) => {
      setResponse(res);
    });
    setTitle('');
    setShowPicker(false);
  };

  const ref = useOnclickOutside(() => setShowPicker(false));

  return (
    <>
      <button ref={addTagRef} onClick={() => toggleAddTagDropdown()} type="button" className={`${showTagDropdown ? 'text-blue-600' : ''} rounded-full bg-gray-200 w-8 h-8 text-center focus:outline-none float-right mr-4 hover:text-blue-600`}><AddIcon /></button>
      { showTagDropdown
        ? (
          <form ref={addTagRef} onSubmit={handleSubmit} className="absolute top-6 w-96 p-4 bg-white shadow-lg rounded-lg z-10">
            <label className="italic inline-block w-8/12 pr-8 box-border text-sm" htmlFor="tagTitle">
              Tag title: &nbsp;
              <span style={(response.success) ? { color: 'green' } : { color: 'red' }}>{response.message}</span>
              <input type="text" id="tagTitle" name="tagTitle" value={title} onChange={(e) => setTitle(e.target.value)} className="text-base block w-full shadow-sm" maxLength="30" required />
            </label>
            <label htmlFor="showPicker" className="italic inline-block w-4/12 text-sm">
              Tag color:
              <input
                type="button"
                id="showPicker"
                value={color}
                style={{ backgroundColor: color, color: setContrast(color) }}
                onClick={() => setShowPicker(!showPicker)}
                className="text-base block w-full items-center px-3 py-1 mb-3 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              />
            </label>
            <div className="inline-block relative w-6/12">
              <input type="submit" value="Add Tag" className="inline-block items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none" />
              {(showPicker) ? (
                <div ref={ref}>
                  <ChromePicker
                    className="font-sans absolute left-full -top-2"
                    color={color}
                    onChange={(e) => { setColor(e.hex); }}
                    disableAlpha
                  />
                </div>

              ) : null}
            </div>
          </form>
        )
        : null}

    </>
  );
}

export default NewTag;
