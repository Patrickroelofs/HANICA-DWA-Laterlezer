import React from 'react';
import chroma from 'chroma-js';

function TagPill({ data }) {
  const { _id, title, color } = data;

  const chromaConversion = (c) => {
    if (chroma.contrast(c, 'white') > 2) {
      return 'white';
    }
    return 'black';
  };

  return (
    <span
      key={_id}
      style={{ background: color, color: chromaConversion(color) }}
      className="inline-block pt-2 pb-2 pr-3 pl-3 mr-2 mb-1 white rounded-3xl font-sans"
    >
      {title}
    </span>
  );
}

export default TagPill;
