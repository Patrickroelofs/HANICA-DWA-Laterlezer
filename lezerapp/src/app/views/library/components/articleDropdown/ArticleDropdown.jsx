import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateArticle, removeArticle } from '../../../../../store/articleSlice';

const moment = require('moment');

function ArticleDropdown({ article, close }) {
  const dispatch = useDispatch();

  const unread = (e) => {
    e.stopPropagation();
    e.preventDefault();
    axios.post(`http://localhost:3000/api/articles/${article._id}/status`, {
      readAt: article.readAt ? null : moment().toISOString(),
    }).then(({ data }) => {
      dispatch(updateArticle(data));
      close();
    });
  };

  const archive = (e) => {
    e.stopPropagation();
    e.preventDefault();
    axios.post(`http://localhost:3000/api/articles/${article._id}/status`, {
      archivedAt: article.archivedAt ? null : moment().toISOString(),
    }).then(({ data }) => {
      dispatch(removeArticle(data));
      close();
    });
  };

  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <span
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-100"
          role="menuitem"
          tabIndex="0"
          onClick={archive}
        >
          { article.archivedAt ? 'Unarchive' : 'Archive' }
        </span>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <span
          tabIndex="0"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-100"
          role="menuitem"
          onClick={unread}
        >
          Mark
          { article.readAt ? ' unread' : ' read' }
        </span>
      </div>
    </div>
  );
}

export default ArticleDropdown;
