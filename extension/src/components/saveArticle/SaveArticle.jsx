/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import BallBeat from 'react-pure-loaders/build/BallBeat';
import { post } from 'axios';
import chroma from 'chroma-js';

import TagListSelect from '../tagListSelect/TagListSelect';
import { openWebSocket } from '../../utils/websocketCommunication';

function SaveArticle({ setUser, user, autoLoggedIn }) {
  const [loaded, setLoaded] = useState('waitForSelect');
  const [error, setError] = useState('');
  const [tab, setTab] = useState({});

  const postArticle = (selectedTags) => {
    setLoaded(false);
    selectedTags.map((tag) => {
      tag.title = tag.value;
      tag.color = chroma(tag.color).hex();
      return tag;
    });
    post('http://localhost:3000/api/articles',
      { url: tab, tags: selectedTags }, {
        headers: {
          Username: localStorage.getItem('username'),
        },
      })
      .then(() => {
        setLoaded(true);
        // sendMessage({ type: 'NEW ARTICLE' });
      }).catch((e) => {
        setError(e.message);
        setLoaded(true);
      });
  };

  const checkBrowser = () => {
    if (chrome) {
      chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
        setTab(tabs[0].url);
      });
    }
  };

  const getLoader = () => {
    if (loaded === true) {
      return (
        <div className="w-full h-full p-6 text-center font-bold text-lg">
          <h2>
            Your article has
            {error ? ' not' : ''}
            {' '}
            been saved.
          </h2>
        </div>
      );
    }
    if (loaded === false) {
      return (
        <div className="App__Loader text-center">
          <BallBeat
            color="#000"
            loading
          />
        </div>
      );
    }
    return '';
  };

  useEffect(() => {
    checkBrowser();
    openWebSocket(user);
  }, []);

  return (
    <>
      <div className="p-6" style={{ minHeight: '128px' }}>
        { loaded === 'waitForSelect' ? <TagListSelect onSave={postArticle} /> : ''}

        {
              error
                ? <h3 className="text-red-500 text-center font-bold">{error}</h3>
                : ''
          }
        { getLoader() }
      </div>
      <div className="w-full sticky bottom-0 bg-gray-100 p-6">
        { !autoLoggedIn && <span className="text-green-600 font-bold block">You&apos;ve been logged in automatically!</span>}
        <span className="align-middle leading-8">
          <span className="font-bold pr-1">Logged in as:</span>
          { localStorage.getItem('username') }
        </span>
        <button type="button" onClick={() => setUser(null)} className="float-right inline-block px-4 py-2 text-xs font-medium text-center text-white uppercase transition bg-red-500 rounded-lg shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none">Logout</button>
      </div>
    </>
  );
}

export default SaveArticle;
