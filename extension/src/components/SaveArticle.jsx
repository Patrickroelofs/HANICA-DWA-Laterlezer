import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import chroma from 'chroma-js';

import TagSelect from './tagSelect/TagSelect';

function SaveArticle() {
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState({});

  const postArticle = (selectedTags) => {
    selectedTags.map((tag) => {
      tag.title = tag.value;
      tag.color = chroma(tag.color).hex();
      return tag;
    });
    axios
      .post('http://localhost:3000/api/articles',
        JSON.stringify({ url: tab, tags: selectedTags }))
      .then(() => {
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

  useEffect(() => {
    checkBrowser();
  }, []);

  return (
    <>
      <TagSelect onSave={postArticle} />
      {
            loaded
              ? <h2>Your article has been saved.</h2>
              : <div className="App__Loader"><ReactLoading type="cylon" color="#000" /></div>
        }
    </>
  );
}

export default SaveArticle;
