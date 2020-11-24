/* eslint react/prop-types: 0 */
import React from 'react';

function Thumbnail(props) {
  const { url } = props;
  return (
    <>
      <div className="w-auto h-full bg-cover bg-center rounded-xl col-span-1" style={{ backgroundImage: `url('${url}')` }} />
    </>
  );
}

export default Thumbnail;
