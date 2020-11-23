/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './dock.scss';

function Dock() {
  const history = useHistory();

  const onLogout = () => {
    localStorage.clear();

    history.push('/login');
    window.location.reload();
  };

  return (
    <section id="dock">
      <div>
        <h3>Logo</h3>
      </div>

      <div>
        <button type="button" onClick={onLogout} className="text-center w-full">Logout</button>
        <button className="profile" type="button"><img alt="" src="http://placehold.it/48x48" /></button>
      </div>
    </section>
  );
}

export default Dock;
