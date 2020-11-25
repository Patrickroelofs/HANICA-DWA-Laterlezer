/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import colourStyles from './colourStyles';

const animatedComponents = makeAnimated();
function TagSelect(props) {
  const { onSave } = props;
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchTags = () => {
    axios.get('http://localhost:3000/api/tags').then(({ data }) => {
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

  const handleChange = (newValue) => {
    setSelectedTags(newValue);
  };

  return (
    <>
      <CreatableSelect
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        isClearable
        onChange={handleChange}
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
