/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

function Tag(props) {
  const [isHighlighted, setHighlighted] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const { tag } = props;
  const { title, color } = tag;

  return (
    <li id="listbox-item-0" role="option" onClick={() => setSelected(!isSelected)} onFocus={() => setHighlighted(!isHighlighted)} onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} className={`${isHighlighted ? 'text-white bg-indigo-600' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`}>
      <div className="flex items-center">
        <span style={{ backgroundColor: color }} className="flex-shrink-0 h-6 w-6 rounded-full" />
        <span className={`${isSelected ? 'font-semibold' : 'font-normal'} ml-3 block truncate`}>
          {title}
        </span>
      </div>
      <span className={`${!isHighlighted ? 'text-white' : 'text-indigo-600'} absolute inset-y-0 right-0 flex items-center pr-4`}>
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    </li>
  );
}

export default Tag;
