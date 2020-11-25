import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import Login from '../app/components/login/Login';
import Register from '../app/components/register/Register';
import Reader from '../app/components/reader/Reader';
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

        <Route path="/app" exact>
          <App />
        </Route>

        <Route path="/app/:id">
          <Reader />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
