import { useState, useEffect } from 'react'
import ReactLoading from 'react-loading';
import fetch from 'node-fetch'

function SaveArticle(props) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const { user } = props;

    const checkBrowser = () => {
        if (!!chrome) {
            chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
                postArticle(tabs[0].url);
            });
        }
    }

    const postArticle = (url) => {
        fetch('http://localhost:3000/api/articles', {
            method: 'POST',
            body: JSON.stringify({
                url: url
            }),
            headers: {'Content-Type': 'application/json', 'Username': user}
        }).then((res) => {
            if (!res.ok) throw Error(res.statusText);
            setLoaded(true);
        }).catch(e => {
            setError(e.message);
            setLoaded(true);
            console.log(error);
        });
    };

    useEffect(() => {
        checkBrowser()
    }, [])

    return (<>
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
    </>)
}

export default SaveArticle
