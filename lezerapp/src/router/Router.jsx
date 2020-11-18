import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import Login from '../login/login';
import Register from '../register/register';
import App from '../app/App';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/app">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
