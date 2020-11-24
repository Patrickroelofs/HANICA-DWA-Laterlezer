/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useHistory } from 'react-router-dom';

function Dock() {
  const history = useHistory();

  const onLogout = () => {
    localStorage.clear();

    history.push('/login');
    window.location.reload();
  };

  return (
    <section id="dock" className="flex flex-col justify-between min-h-screen md:sticky md:top-0">
      <div className="w-full text-center pt-4">
        {/* logo here */}
      </div>

      <div className="pb-8">
        <button type="button" onClick={onLogout} className="text-center w-full mb-4">Logout</button>
        <img className="m-auto rounded-full h-42 w-42" alt="" src="http://placehold.it/48x48" />
      </div>
    </section>
  );
}

export default Dock;
