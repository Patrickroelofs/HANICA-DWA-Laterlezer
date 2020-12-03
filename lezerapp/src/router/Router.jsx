import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import { useSelector } from 'react-redux';
import Login from '../app/components/login/Login';
import Register from '../app/components/register/Register';
import Reader from '../app/components/reader/Reader';
import App from '../app/App';
import { selectUsername } from '../store/userSlice';

function Router() {
  const username = useSelector(selectUsername);

  const checkLoggedIn = (comp) => (!username ? <Redirect to="/login" /> : comp);
  const checkLoggedOut = (comp) => (username ? <Redirect to="/app" /> : comp);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {checkLoggedIn(<Redirect to="/app" />)}
        </Route>

        <Route path="/login">
          {checkLoggedOut(<Login />)}
        </Route>

        <Route path="/register">
          {checkLoggedOut(<Register />)}
        </Route>

        <Route path="/app" exact>
          {checkLoggedIn(<App />)}
        </Route>

        <Route path="/app/:id">
          {checkLoggedIn(<Reader />)}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
