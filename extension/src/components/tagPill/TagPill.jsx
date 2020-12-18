import React, { memo } from 'react';
import setContrast from '../../utils/chromaContrast';

export default memo(({ data: { _id, title, color } }) => (
  <span
    key={_id}
    style={{ background: color, color: setContrast(color) }}
    className="inline-block pt-2 pb-2 pr-3 pl-3 mr-2 mb-1 white rounded-3xl font-sans"
  >
    {title}
  </span>
), (prevProps, nextProps) => prevProps === nextProps);
