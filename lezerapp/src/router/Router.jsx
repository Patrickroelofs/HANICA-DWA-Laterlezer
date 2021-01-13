import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import { useSelector } from 'react-redux';
import Login from '../app/views/login/Login';
import Register from '../app/views/register/Register';
import Reader from '../app/views/reader/Reader';
import App from '../app/App';
import { selectUsername, selectProfilePicture } from '../store/userSlice';
import Nav from '../app/views/sharedcomponents/nav/Nav';
import Dock from '../app/views/sharedcomponents/dock/Dock';

function Router() {
  const username = useSelector(selectUsername);
  const profilePicture = useSelector(selectProfilePicture);

  const checkLoggedIn = (comp) => (!username ? <Redirect to="/login" /> : comp);
  const checkLoggedOut = (comp) => (username ? <Redirect to="/app" /> : comp);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {checkLoggedIn(<Redirect to="/app" />)}
        </Route>

        <Route path="/login">{checkLoggedOut(<Login />)}</Route>

        <Route path="/register">{checkLoggedOut(<Register />)}</Route>

        <div className="min-h-screen bg-gray-50 font-serif text-sm">
          <div className="min-h-full md:grid grid-cols-4">
            <nav className="col-span-1">
              <div className="grid grid-cols-5 min-h-full">
                <div className="col-span-1 bg-white relative top-0">
                  <Dock profilePicture={profilePicture} />
                </div>
                <div className="col-span-4 relative top-0">
                  <div className="min-h-screen sticky top-0 z-50">
                    <Nav />
                  </div>
                </div>
              </div>
            </nav>

            <main className="min-h-screen col-span-3 bg-white">
              <Route path="/app" exact>
                {checkLoggedIn(<App />)}
              </Route>

              <Route path="/app/status/:status" exact>
                {checkLoggedIn(<App />)}
              </Route>

              <Route exact path="/app/:id">{checkLoggedIn(<Reader />)}</Route>
            </main>
          </div>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
