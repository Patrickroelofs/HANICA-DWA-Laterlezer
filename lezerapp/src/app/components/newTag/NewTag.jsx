import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';
import chroma from 'chroma-js';
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

  const chromaConversion = (tagColor) => {
    if (tagColor !== '') {
      if (chroma.contrast(tagColor, 'white') > 2) {
        return 'white';
      }
    }
    return 'black';
  };

  useEffect(() => {
    if (color === '') {
      setRandomColor();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <p className="pt-6 pb-4 text-xl font-bold">Add a tag</p>
      <label className="italic inline-block w-8/12 pr-8 box-border text-sm" htmlFor="tagTitle">
        Tag title: &nbsp;
        <span style={(response.success) ? { color: 'green' } : { color: 'red' }}>{response.message}</span>
        <input type="text" id="tagTitle" name="tagTitle" value={title} onChange={changeTitle} className="text-base block w-full shadow-sm" maxLength="30" required />
      </label>
      <label htmlFor="showPicker" className="italic inline-block w-4/12 text-sm">
        Tag color:
        <input
          type="button"
          id="showPicker"
          value={color}
          style={{ backgroundColor: color, color: chromaConversion(color) }}
          onClick={changeShowPicker}
          className="text-base block w-full items-center px-3 py-1 mb-3 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        />
      </label>
      <div className="inline-block relative w-6/12">
        <input type="submit" value="Add Tag" className="inline-block items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none" />
        {(showPicker) ? (
          <ChromePicker
            className="font-sans absolute left-full -top-2"
            color={color}
            onChange={handleChangeComplete}
            disableAlpha
          />
        ) : null}
      </div>
      <hr className="my-3" />
    </form>
  );
}

export default NewTag;
