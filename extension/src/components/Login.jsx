import React, { useState } from 'react';

function Login({ setUser }) {
  const [name, setName] = useState('');

  function receiveText(resultsArray) {
    const usernameResult = JSON.parse(resultsArray[0]).username;
    setName(usernameResult);
    setUser(usernameResult);
  }

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    if (tabs[0].selected === true && tabs[0].url === 'http://localhost:3001/app') {
      chrome.tabs.executeScript({
        code: 'JSON.parse(localStorage.getItem(\'persist:root\')).user',
      }, receiveText);
    }
  });

  return (
    <div className="login p-8 text-center">
      <strong className="text-lg py-6 block">Open the extension once on the app to automatically login</strong>
      <hr />
      <p className="text-base py-6 block font-medium">Or login with your username</p>
      <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name} className="mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" />
      <button type="submit" onClick={() => setUser(name)} className="bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 ml-4 hover:bg-indigo-500 transition ease-in-out duration-300">Login</button>
    </div>
  );
}

export default Login;
