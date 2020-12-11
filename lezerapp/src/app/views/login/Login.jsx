import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { loginUser, googleAccount } from '../../../store/userSlice';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [response, setResponse] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(e.target.username.value)).then(() => {
      history.push('/app');
    }).catch((error) => {
      setResponse({
        status: error.status,
        message: error.response.data,
        success: false,
      });
    });
  };

  const successResponseFromGoogle = (googleResponse) => {
    dispatch(googleAccount(googleResponse)).then(() => {
      history.push('/app');
    });
  };

  const failResponseFromGoogle = (googleResponse) => {
    // TODO: Gracefully handle this error
    // eslint-disable-next-line no-console
    console.info('fail:', googleResponse);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-12">
        <h1 className="mt-6 text-center text-6xl font-extrabold text-gray-900">
          LaterLezer
        </h1>
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <div className="text-center">
          <GoogleLogin
            clientId="366910807736-j7einmtbo7udt56fvfs9hdmvsc1puv5u.apps.googleusercontent.com"
            buttonText="Continue"
            onSuccess={successResponseFromGoogle}
            onFailure={failResponseFromGoogle}
            cookiePolicy="single_host_origin"
            isSignedIn
          />
        </div>

        <h2 className="text-center text-xl font-extrabold text-gray-900">
          Or login with
        </h2>
        <hr />

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="leading-10">
                Username &nbsp;
                <span style={(response.success) ? { color: 'green' } : { color: 'red' }}>{response.message}</span>
                <input id="username" name="username" type="string" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
              </label>
            </div>
          </div>

          <div>
            <button id="login" type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
            <button type="submit" onClick={() => history.push('/register')} className="group relative w-full flex justify-center py-2 px-4 mt-6 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Login;
