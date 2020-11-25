import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';
import createTag from './NewTagAction';

function NewTag() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [response, setResponse] = useState({});

  const setRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let randColor = '#';
    for (let i = 0; i < 6; i++) {
      randColor += letters[Math.floor(Math.random() * 16)];
    }
    setColor(randColor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTag(title, color)).then((res) => {
      setResponse(res);
    });
    setTitle('');
    setShowPicker(false);
    setRandomColor();
  };

  const changeShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeComplete = (color2) => {
    setColor(color2.hex);
  };

  useEffect(() => {
    if (color === '') {
      setRandomColor();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <p style={(response.success) ? { color: 'green' } : { color: 'red' }}>{response.message}</p>
      <label htmlFor="tagTitle">
        Tag title:
        <input type="text" id="tagTitle" name="tagTitle" value={title} onChange={changeTitle} className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md l:text-l border-gray-300" />
      </label>
      <label htmlFor="showPicker">
        Tag color:
        <input
          type="button"
          id="showPicker"
          value={color}
          style={{ backgroundColor: color }}
          onClick={changeShowPicker}
          className="block w-full items-center px-3 py-1 mb-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        />
      </label>
      <input type="submit" value="Submit" className="block w-full items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none" />
      {(showPicker) ? (
        <ChromePicker
          color={color}
          onChange={handleChangeComplete}
        />
      ) : null}
      <hr className="my-3" />
    </form>
  );
}

export default NewTag;
