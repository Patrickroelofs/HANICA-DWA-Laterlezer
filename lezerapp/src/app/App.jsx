import React from 'react';
import { useSelector } from 'react-redux';
import Articles from './views/library/Articles';
import { selectUsername } from '../store/userSlice';
import AddArticle from './views/sharedcomponents/addArticle/AddArticle';
import { useInterceptor } from '../utils/helpers';

function App() {
  const username = useSelector(selectUsername);

  useInterceptor(username);

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
