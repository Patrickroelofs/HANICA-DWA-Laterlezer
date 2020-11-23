/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TagSelect() {
  const [tags, setTags] = useState([]);

  const fetchTags = () => {
    axios.get('http://localhost:3000/api/user/testuser/tag').then(({ data }) => {
      setTags(data.data);
    });
  };
  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <>
      <div style={{ display: 'block' }}>
        <select>
          { tags.map((tag) => (<option value={tag._id}>{ tag.title }</option>)) }
        </select>
      </div>
    </>
  );
}

export default TagSelect;
