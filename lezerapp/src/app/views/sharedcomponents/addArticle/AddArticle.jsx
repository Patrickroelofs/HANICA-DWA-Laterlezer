/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable */
import React from 'react';
import { post } from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import { selectUsername } from '../../../../store/userSlice';

function AddArticle() {
  const history = useHistory();
  const username = useSelector(selectUsername);

  const postArticle = (e) => {
    e.preventDefault();

    post('http://localhost:3000/api/articles',
      { url: e.target[0].value, tags: [] }, {
        headers: {
          Username: username,
        },
      }).then((response) => {
      history.push(`/app/${response.data.data}`);
    });
  };

  return (
    <div className="bg-gray-50 flex justify-between">
      <div id="left" className="flex justify-center">
        {/* Something Here */}
      </div>
      <div id="center" className="flex justify-center w-1/3">
        <form onSubmit={postArticle} className="py-6 w-full relative">
          <input name="input" placeholder="Add article" type="text" className="transition-shadow focus:shadow-lg bg-white w-full h-10 px-5 pr-10 rounded-full text-sm focus:outline-none" />
          <button type="submit" className="absolute right-0 top-5 mt-3 mr-4 focus:outline-none transition-all hover:text-blue-700">
            <SendIcon />
          </button>
        </form>
      </div>
      <div id="right" className="flex justify-center">
        {/* Something Here */}
      </div>
    </div>
  );
}

export default AddArticle;
