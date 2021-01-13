import React from 'react';
import { useSelector } from 'react-redux';
import Dock from './views/sharedcomponents/dock/Dock';
import Nav from './views/sharedcomponents/nav/Nav';
import Articles from './views/library/Articles';
import { selectUsername, selectProfilePicture } from '../store/userSlice';
import AddArticle from './views/sharedcomponents/addArticle/AddArticle';
import { useInterceptor } from '../utils/helpers';

function App() {
  const username = useSelector(selectUsername);
  const profilePicture = useSelector(selectProfilePicture);

  useInterceptor(username);

  return (
    <div className="min-h-screen bg-gray-50 font-serif text-sm">
      <div className="min-h-full md:grid grid-cols-4">
        <nav className="col-span-1">
          <div className="grid grid-cols-5 min-h-full">
            <div className="col-span-1 bg-white relative top-0">
              <Dock profilePicture={profilePicture} />
            </div>
            <div className="col-span-4 relative top-0">
              <div className="min-h-screen sticky top-0 z-50">
                <Nav />
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen col-span-3 bg-white">
          <AddArticle />
          <div className="container max-w-5xl mx-auto p-16 pt-8 pb-0">
            <Articles />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
