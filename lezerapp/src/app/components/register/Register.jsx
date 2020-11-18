import React from 'react';

// TODO: Register functionality
function Register() {
  return (
    <div className="bootstrap-container">
      <h1>Register</h1>

      <form>
        <div>
          <label htmlFor="firstname">
            First Name
            <input type="text" />
          </label>
        </div>

        <div>
          <label htmlFor="lastname">
            Last Name
            <input type="text" />
          </label>
        </div>

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
    </div>
  );
}

export default Register;
