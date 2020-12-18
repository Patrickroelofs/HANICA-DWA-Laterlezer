/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import SaveArticle from './components/SaveArticle';
import Login from './components/Login';

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
    <div className="App w-96 h-96">
      { !user
        ? <Login setUser={storeUser} setAutoLoggedIn={setAutoLoggedIn} />
        : <SaveArticle setUser={storeUser} user={user} autoLoggedIn={autoLoggedIn} /> }
    </div>
  );
}

export default App;
