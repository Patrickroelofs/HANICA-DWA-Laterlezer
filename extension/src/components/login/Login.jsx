import React, { useState } from 'react';
import { get } from 'axios';

function Login({ setUser, setAutoLoggedIn }) {
  const [name, setName] = useState('');
  const [response, setResponse] = useState();
  const API_URL = 'http://localhost:3000/api';

  const googleLogin = async (resultsArray) => {
    const usernameResult = JSON.parse(resultsArray[0]).username;

    await get(`${API_URL}/user/${usernameResult}`)
      .then(({ data }) => {
        setName(data.username);
        setUser(data.username);
      }).catch((err) => {
        console.log(err);
      });
  };

  const usernameLogin = async (username) => {
    await get(`${API_URL}/user/${username}`)
      .then(({ data }) => {
        setName(data.username);
        setUser(data.username);
      }).catch((err) => {
        setResponse(err);
      });
  };

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    if (tabs[0].selected === true && tabs[0].url.indexOf('localhost:3001/app')) {
      chrome.tabs.executeScript({
        code: 'JSON.parse(localStorage.getItem(\'persist:root\')).user',
      }, googleLogin);
      setAutoLoggedIn(true);
    }
  });

  return (
    <div className="login p-8 mb-8 text-center">
      <strong className="text-lg py-6 block">Open the extension once on the app to automatically login</strong>
      <hr />
      <p className="text-base py-6 block font-medium">Or login with your username</p>
      {
        response && <span className="text-red-600 font-bold block">Something went wrong</span>
      }
      <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name} className="mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" />
      <button type="submit" onClick={() => usernameLogin(name)} className="focus:outline-none bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 ml-4 hover:bg-indigo-500 transition ease-in-out duration-300">Login</button>
    </div>
  );
}

export default Login;
