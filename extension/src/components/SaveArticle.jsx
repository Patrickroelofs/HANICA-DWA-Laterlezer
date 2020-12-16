/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import BallBeat from 'react-pure-loaders/build/BallBeat';
import { post } from 'axios';
import chroma from 'chroma-js';

import TagSelect from './tagSelect/TagSelect';
import { openWebSocket, sendMessage } from '../utils/serverCommunication';

function SaveArticle(props) {
  const { setUser, user } = props;
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
        sendMessage({ type: 'NEW ARTICLE' });
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
        <h2>
          Your article has
          {error ? ' not' : ''}
          {' '}
          been saved.
        </h2>
      );
    }
    if (loaded === false) {
      return (
        <div className="App__Loader">
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
      <button type="button" onClick={() => setUser(null)}>Logout</button>
      { loaded === 'waitForSelect' ? <TagSelect onSave={postArticle} /> : ''}

      {
            error
              ? <h3 style={{ color: 'red' }}>{error}</h3>
              : ''
        }
      { getLoader() }
    </>
  );
}

export default SaveArticle;
