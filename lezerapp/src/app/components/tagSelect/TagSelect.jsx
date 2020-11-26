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
function TagSelect(props) {
  const { url, initSelectedTags, onSubmit } = props;
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

  const postTags = () => {
    if (selectedTags != null) {
      selectedTags.map((tag) => {
        tag.title = tag.value;
        tag.color = chroma(tag.color).hex();
        return tag;
      });
    }
    axios.post(url, { tags: selectedTags || [] }).then((res) => {
      onSubmit(res);
    });
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (initSelectedTags) {
      setSelectedTags(initSelectedTags.map((tag) => ({
        title: tag.title,
        value: tag.title,
        label: tag.title,
        color: tag.color,
      })));
    }
  }, [initSelectedTags]);

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
        value={selectedTags}
        options={tags}
        // eslint-disable-next-line prefer-rest-params
        styles={colourStyles()}
      />
      <button type="submit" onClick={() => postTags()} className="inline-block mt-4 items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">Add</button>
    </>
  );
}

export default TagSelect;
