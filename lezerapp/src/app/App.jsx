import React from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import Articles from './views/library/Articles';
import { selectUsername } from '../store/userSlice';
import AddArticle from './views/sharedcomponents/addArticle/AddArticle';

function App() {
  const username = useSelector(selectUsername);

  axios.interceptors.request.use((config) => {
    if (username) {
      config.headers.Username = username;
    }
    return config;
  });

  return (
    <>
      <AddArticle />
      <div className="container max-w-5xl mx-auto p-16 pt-8 pb-0">
        <Articles />
      </div>
    </>
  );
}

export default App;
