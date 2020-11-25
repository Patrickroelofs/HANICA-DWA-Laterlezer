/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';
import colourStyles from './colourStyles';

const animatedComponents = makeAnimated();
function TagSelect() {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchTags = () => {
    axios.get('http://localhost:3000/api/user/testuser/tag').then(({ data }) => {
      setTags(data.data.map((tag) => {
        tag.value = tag.title;
        tag.label = tag.title;
        return tag;
      }));
    });
  };

  const postTags = () => {
    selectedTags.map((tag) => {
      tag.title = tag.value;
      tag.color = chroma(tag.color).hex();
      return tag;
    });
    axios.post('http://localhost:3000/api/tag', { tags: selectedTags });
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
        // eslint-disable-next-line prefer-rest-params
        styles={colourStyles()}
      />
      <button type="submit" onClick={() => postTags()}>Add</button>
    </>
  );
}

export default TagSelect;
