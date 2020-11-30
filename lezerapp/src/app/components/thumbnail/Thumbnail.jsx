import React from 'react';

function Thumbnail({ url }) {
  return (
    <>
      <div className="w-auto h-36 bg-cover bg-center rounded-xl col-span-1 shadow-xl" style={{ backgroundImage: `url('${url}')` }} />
    </>
  );
}

export default Thumbnail;
