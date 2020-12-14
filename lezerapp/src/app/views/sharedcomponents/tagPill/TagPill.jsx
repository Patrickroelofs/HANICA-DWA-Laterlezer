import React from 'react';
import setContrast from '../../../../utils/chromaContrast';

function TagPill({ data }) {
  const { _id, title, color } = data;

  return (
    <span
      key={_id}
      style={{ background: color, color: setContrast(color) }}
      className="inline-block pt-2 pb-2 pr-3 pl-3 mr-2 mb-1 white rounded-3xl font-sans"
    >
      {title}
    </span>
  );
}

export default TagPill;
