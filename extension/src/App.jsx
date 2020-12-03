/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import SaveArticle from './components/SaveArticle';
import Login from './components/Login';

import './App.scss';

function App() {
  const [user, setUser] = useState('');

  const storeUser = (u) => {
    localStorage.setItem('username', u);
    setUser(u);
  };

  useEffect(() => {
    const stored = localStorage.getItem('username');
    if (stored) {
      setUser(stored);
    }
  });

  return (
    <div className="App">
      { !user ? <Login setUser={storeUser} /> : <SaveArticle user={user} /> }
    </div>
  );
}

export default App;
