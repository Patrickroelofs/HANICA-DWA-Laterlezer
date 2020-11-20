import { useState, useEffect } from 'react'
import ReactLoading from 'react-loading';
import fetch from 'node-fetch'

function SaveArticle(props) {
    const [loaded, setLoaded] = useState(false);
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
        }).then(() => {
            setLoaded(true);
        }).catch(e => {
            console.log(e)
        });
    };

    useEffect(() => {
        checkBrowser()
    }, [])

    return (<>
        {
            loaded
                ?
                <h2>Your article has been saved.</h2>
                :
                <div className="App__Loader"><ReactLoading type="cylon" color="#000" /></div>
        }
    </>)
}

export default SaveArticle
