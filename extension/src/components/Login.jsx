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
    <div className="login">
      <strong>Open the extension once on the app to automatically login</strong>
      <hr />
      <p>Or login with your username</p>
      <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name} />
      <button type="submit" onClick={() => setUser(name)}>Login</button>
    </div>
  );
}

export default Login;
