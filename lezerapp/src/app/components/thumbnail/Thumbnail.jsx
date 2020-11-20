/* eslint react/prop-types: 0 */
import React from 'react';
import './thumbnail.scss';

function Thumbnail(props) {
  const { url } = props;
  return (
    <>
      <div className="thumbnail" style={{ backgroundImage: `url('${url}')` }} />
    </>
  );
}

export default Thumbnail;
