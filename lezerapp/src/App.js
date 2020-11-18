import React from 'react';
import './css/App.scss';

import { Dock } from './components2/dock/dock';
import { Nav } from './components2/nav/nav';
import { Articles } from './components2/articles/articles';


function App() {
  return (
    <React.Fragment>
      <nav>
        <Dock></Dock>
        <Nav></Nav>
      </nav>
      <main>
        <div class="bootstrap-wrapper">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <Articles></Articles>
              </div>

              <div class="col-md-4">
                <p>Een paar coole links, of iets anders interessants</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
