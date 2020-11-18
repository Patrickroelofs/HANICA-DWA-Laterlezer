import React from 'react';

// TODO: Login functionality
function Login() {
  return (
    <>
      <h1>Login</h1>

      <form>
        <div>
          <label htmlFor="username">
            Username
            <input type="text" />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Password
            <input type="password" />
          </label>
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
}

export default Login;
