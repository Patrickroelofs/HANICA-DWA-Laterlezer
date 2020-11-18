/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './dock.scss';

function Dock() {
  return (
    <section id="dock">
      <div>
        <h3>Logo</h3>
      </div>

      <div>
        <button className="profile" type="button"><img alt="" src="http://placehold.it/48x48" /></button>
      </div>
    </section>
  );
}

export default Dock;
