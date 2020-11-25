import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import chroma from 'chroma-js';

import TagSelect from '../components/tagSelect/TagSelect'

function SaveArticle(props) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const { user } = props;

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
        if (!res.ok) throw Error(res.statusText);
        setLoaded(true);
      }).catch(e => {
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

  useEffect(() => {
    checkBrowser();
  }, []);

    return (<>
     <TagSelect onSave={postArticle} />
        {
            error
                ?
                <h3 style={{color: 'red'}}>{error}</h3>
                :
                ''
        }
        {
            loaded
                ?
                <h2>Your article has {error ? 'not' : ''} been saved.</h2>
                :
                <div className="App__Loader"><ReactLoading type="cylon" color="#000" /></div>
        }
    </>
  );
}

export default SaveArticle;
