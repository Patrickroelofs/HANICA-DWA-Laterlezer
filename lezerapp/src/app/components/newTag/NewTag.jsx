import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';
import createTag from './NewTagAction';

function NewTag() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTag(title, color));
    setTitle('');
    setColor('');
    setShowPicker(false);
  };

  const changeShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const handleChangeComplete = (color2) => {
    setColor(color2.hex);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tagTitle">
        Tag title:
        <input type="text" id="tagTitle" name="tagTitle" value={title} onChange={changeTitle} className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md l:text-l border-gray-300" />
      </label>
      <label htmlFor="tagColor">
        Tag color:
        <input placeholder="HEX Code color" type="text" id="tagColor" name="tagColor" value={color} onChange={changeColor} className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md l:text-l border-gray-300" />
      </label>
      <input type="button" id="showPicker" value="Color picker" onClick={changeShowPicker} className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none" />
      <input type="submit" value="Submit" className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none" />
      {(showPicker) ? (
        <SketchPicker
          color="#fff"
          onChangeComplete={handleChangeComplete}
        />
      ) : null}
    </form>
  );
}

export default NewTag;
