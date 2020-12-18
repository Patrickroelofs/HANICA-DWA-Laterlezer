/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import SaveArticle from './saveArticle/SaveArticle';
import Login from './login/Login';

function App() {
  const [user, setUser] = useState('');
  const [autoLoggedIn, setAutoLoggedIn] = useState(false);

  const storeUser = (u) => {
    localStorage.setItem('username', u);
    if (!u) {
      localStorage.removeItem('username');
    }
    setUser(u);
    setAutoLoggedIn(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem('username');
    if (stored) {
      setUser(stored);
    }
  });

  return (
    <div className="App max-h-96 overflow-x-hidden overflow-y-visible" style={{ width: '36rem' }}>
      { !user
        ? <Login setUser={storeUser} setAutoLoggedIn={setAutoLoggedIn} />
        : <SaveArticle setUser={storeUser} user={user} autoLoggedIn={autoLoggedIn} /> }
    </div>
  );
}

export default App;
