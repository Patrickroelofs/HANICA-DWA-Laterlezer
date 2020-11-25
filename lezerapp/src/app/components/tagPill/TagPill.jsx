/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import chroma from 'chroma-js';

function TagPill(props) {
  const chromaConversion = (color) => {
    if (chroma.contrast(color, 'white') > 2) {
      return 'white';
    }
    return 'black';
  };

  return (
    <span
      key={props.data.id}
      style={{ background: props.data.color, color: chromaConversion(props.data.color) }}
      className="inline-block pt-2 pb-2 pr-3 pl-3 mr-2 white rounded-3xl font-sans"
    >
      {props.data.title}
    </span>
  );
}

export default TagPill;
