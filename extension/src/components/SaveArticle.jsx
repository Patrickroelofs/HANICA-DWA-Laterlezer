/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import chroma from 'chroma-js';

import TagSelect from './tagSelect/TagSelect';

function SaveArticle() {
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
    axios
      .post('http://localhost:3000/api/articles',
        { url: tab, tags: selectedTags }, {
          headers: {
            Username: localStorage.getItem('username'),
          },
        })
      .then(() => {
        setLoaded(true);
      }).catch((e) => {
        setError(e.message);
        setLoaded(true);
        console.log(error);
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
      return <div className="App__Loader"><ReactLoading type="cylon" color="#000" /></div>;
    }
    return '';
  };

  useEffect(() => {
    checkBrowser();
  }, []);

  return (
    <>
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
