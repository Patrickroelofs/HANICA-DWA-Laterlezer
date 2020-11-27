import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import registerUser from './RegisterAction';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [response, setResponse] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(e.target.username.value)).then(() => {
      history.push('/app');
      // TODO: Beautify this
      window.location.reload('/app');
    }).catch((error) => {
      setResponse({
        status: error.status,
        message: error.response.data,
        success: false,
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-12">
        <h1 className="mt-6 text-center text-6xl font-extrabold text-gray-900">
          LaterLezer
        </h1>
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Register an account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="leading-10">
                Username &nbsp;
                <span style={(response.success) ? { color: 'green' } : { color: 'red' }}>{response.message}</span>
                <input id="username" name="username" type="string" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
              </label>
            </div>
            <div>
              <button type="submit" className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Register Account
              </button>
              <button type="button" onClick={() => history.push('/app')} className="group relative w-full flex justify-center py-2 px-4 mt-6 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Register;
