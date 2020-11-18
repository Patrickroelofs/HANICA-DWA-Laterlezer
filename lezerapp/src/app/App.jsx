import React from 'react';

import './App.scss';

import Dock from './components/dock/Dock';
import Nav from './components/nav/Nav';
import Articles from './components/articles/Articles';

function App() {
  return (
    <>
      <nav>
        <Dock />
        <Nav />
      </nav>
      <main>
        <div className="bootstrap-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <Articles />
              </div>

              <div className="col-md-4">
                <p>Een paar coole links, of iets anders interessants</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
