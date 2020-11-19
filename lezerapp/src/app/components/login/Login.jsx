import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import loginUser from './LoginAction';

// TODO: Login functionality
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    dispatch(loginUser(userData)).then(() => {
      history.push('/app');
    });
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username
            <input name="username" type="text" />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Password
            <input name="password" type="password" />
          </label>
        </div>

        <div>
          <input type="submit" value="Login" />
        </div>
      </form>

      <button name="register" type="button" onClick={() => history.push('/register')}>Register</button>
    </>
  );
}

export default Login;
