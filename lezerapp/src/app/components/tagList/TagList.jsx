import React from 'react';
import TagSelect from '../tagSelect/TagSelect';
import './tagList.scss';

function TagList() {
  return (
    <ul id="compositions-list" className="pure-tree main-tree">
      <h4>Tags</h4>
      <TagSelect />
      <li>
        <label htmlFor="Tag-1">
          <input type="checkbox" id="Tag-1" />
          Tag 1
        </label>
        <ul className="pure-tree">
          <li className="pure-tree_link">
            <a href="index.html" target="_blank">
              An Tag
            </a>
          </li>
          <li>
            <label htmlFor="Subtag-1">
              <input type="checkbox" id="Subtag-1" />
              Subtag1
            </label>
            <ul className="pure-tree">
              <li>
                <label htmlFor="Subtag1-1">
                  <input type="checkbox" id="Subtag1-1" />
                  Subtag1-1
                </label>
                <ul className="pure-tree">
                  <li className="pure-tree_link">
                    <a href="index.html" target="_blank">
                      An Tag
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <label htmlFor="Subtag1-2">
                  <input type="checkbox" id="Subtag1-2" />
                  Subtag1-2
                </label>
                <ul className="pure-tree">
                  <li className="pure-tree_link">
                    <a href="index.html" target="_blank">
                      A Tag
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default TagList;
