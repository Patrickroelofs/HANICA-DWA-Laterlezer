import React, { memo } from 'react';
import { setContrast } from '../../../../utils/helpers';

export default memo(({ data: { _id, title, color } }) => (
  <span
    key={_id}
    style={{ background: color, color: setContrast(color) }}
    className="inline-block pt-2 pb-2 pr-3 pl-3 ml-px mr-px white rounded-3xl font-sans"
  >
    {title}
  </span>
), (prevProps, nextProps) => prevProps === nextProps);
