/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { get } from 'axios';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import colourStyles from './colourStyles';

const animatedComponents = makeAnimated();
function TagSelect({ onSave }) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchTags = () => {
    get('http://localhost:3000/api/tags', {
      headers: {
        Username: localStorage.getItem('username'),
      },
    }).then(({ data }) => {
      setTags(data.data.map((tag) => {
        tag.value = tag.title;
        tag.label = tag.title;
        return tag;
      }));
    });
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <>
      <CreatableSelect
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        isClearable
        onChange={(e) => setSelectedTags(e)}
        options={tags}
        styles={colourStyles()}
        style={{ width: '300px' }}
      />
      <button
        type="submit"
        onClick={() => onSave(selectedTags)}
      >
        Add
      </button>
    </>
  );
}

export default TagSelect;
