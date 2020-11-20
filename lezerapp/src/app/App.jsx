import React from 'react';

import './App.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dock from './components/dock/Dock';
import Nav from './components/nav/Nav';
import Articles from './components/articles/Articles';
import Reader from './components/reader/Reader';

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
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/app">
                      <Articles />
                    </Route>

                    <Route path="/app/:id">
                      <Reader />
                    </Route>
                  </Switch>
                </BrowserRouter>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
