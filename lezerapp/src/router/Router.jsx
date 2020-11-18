import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import Login from '../login/Login';
import Register from '../register/Register';
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
