import React from 'react';
import { useDispatch } from 'react-redux';
import { prioritize, read, archive } from '../../../../../store/articleSlice';

function ArticleDropdown({ article, close }) {
  const dispatch = useDispatch();

  const clickHandler = (e, context) => {
    e.stopPropagation();
    e.preventDefault();

    switch (context) {
      case 'read':
        dispatch(read(article));
        break;
      case 'archive':
        dispatch(archive(article));
        break;
      case 'prioritize':
        dispatch(prioritize(article));
        break;
      default:
        break;
    }

    close();
  };

  return (
    <div
      className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <span
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-100"
          role="menuitem"
          tabIndex="0"
          onClick={(e) => clickHandler(e, 'archive')}
        >
          { article.archivedAt ? 'Unarchive' : 'Archive' }
        </span>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <span
          tabIndex="0"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-100"
          role="menuitem"
          onClick={(e) => clickHandler(e, 'read')}
        >
          Mark
          { article.readAt ? ' unread' : ' read' }
        </span>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <span
          tabIndex="0"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-100"
          role="menuitem"
          onClick={(e) => clickHandler(e, 'prioritize')}
        >
          {
            article.prioritizedAt ? ' Dismiss priority' : ' Prioritize'
          }
        </span>
      </div>
    </div>
  );
}

export default ArticleDropdown;
