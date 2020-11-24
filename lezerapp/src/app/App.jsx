import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from 'axios';
import { useStore } from 'react-redux';
import Dock from './components/dock/Dock';
import Nav from './components/nav/Nav';
import Articles from './components/articles/Articles';
import Reader from './components/reader/Reader';

function App() {
  const store = useStore();
  axios.interceptors.request.use((config) => {
    if (store.getState().user) {
      config.headers.Username = store.getState().user.username;
    }
    return config;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-serif text-sm">
      <div className="min-h-full md:grid grid-cols-4">
        <nav className="col-span-1">
          <div className="grid grid-cols-5 min-h-full">
            <div className="col-span-1 bg-white relative top-0">
              <Dock />
            </div>
            <div className="col-span-4">
              <Nav />
            </div>
          </div>
        </nav>
        <main className="min-h-screen col-span-3 bg-white">
          <div className="container max-w-5xl mx-auto p-16 pt-8 pb-0">
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
        </main>
      </div>
    </div>
  );
}

export default App;
