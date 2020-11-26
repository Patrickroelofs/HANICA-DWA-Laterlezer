/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Lock } from '@material-ui/icons';

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
        <Link to="/app">
          <img className="m-auto w-16" alt="" src="/logo512.png" />
        </Link>
      </div>

      <div className="pb-8">
        <button type="button" onClick={onLogout} className="text-center w-full mb-4"><Lock /></button>
        <img className="m-auto rounded-full w-16" alt="" src="https://cdn.discordapp.com/attachments/775300546122612767/781448294924025856/unknown.png" />
      </div>
    </section>
  );
}

export default Dock;
