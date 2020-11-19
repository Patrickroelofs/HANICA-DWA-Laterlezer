import React from 'react';
import { useDispatch } from 'react-redux';

import registerUser from './RegisterAction';

function Register() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
    };

    dispatch(registerUser(userData));
  };

  return (
    <div className="bootstrap-container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">
            First Name
            <input name="firstName" type="text" />
          </label>
        </div>

        <div>
          <label htmlFor="lastname">
            Last Name
            <input name="lastName" type="text" />
          </label>
        </div>

        <div>
          <label htmlFor="username">
            Username
            <input name="username" type="text" />
          </label>
        </div>

        <div label htmlFor="email">
          Email
          <input name="email" type="text" />
        </div>

        <div>
          <label htmlFor="password">
            Password
            <input name="password" type="password" />
          </label>
        </div>

        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}

export default Register;
