import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import { useStore } from 'react-redux';
import Login from '../app/components/login/Login';
import Register from '../app/components/register/Register';
import Reader from '../app/components/reader/Reader';
import App from '../app/App';

function Router() {
  const store = useStore();

  const checkLoggedIn = (comp) => {
    if (!store.getState().user.username) {
      return <Redirect to="/login" />;
    }
    return comp;
  };

  const checkLoggedOut = (comp) => {
    if (store.getState().user.username) {
      return <Redirect to="/app" />;
    }
    return comp;
  };

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
