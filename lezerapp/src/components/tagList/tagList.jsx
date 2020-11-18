import React from 'react';
import './tagList.scss';

export const TagList = () => {
  return (
    <ul id="compositions-list" class="pure-tree main-tree">
      <h4>Tags</h4>
      <li>
        <input type="checkbox" id="Tag-1" />
        <label for="Tag-1">Tag 1</label>
        <ul class="pure-tree">
          <li class="pure-tree_link">
            <a href="index.html" target="_blank">
              An Tag
            </a>
          </li>
          <li>
            <input type="checkbox" id="Subtag-1" />
            <label for="Subtag-1">Subtag1</label>
            <ul class="pure-tree">
              <li>
                <input type="checkbox" id="Subtag1-1" />
                <label for="Subtag1-1">Subtag1-1</label>
                <ul class="pure-tree">
                  <li class="pure-tree_link">
                    <a href="index.html" target="_blank">
                      An Tag
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <input type="checkbox" id="Subtag1-2" />
                <label for="Subtag1-2">Subtag1-2</label>
                <ul class="pure-tree">
                  <li class="pure-tree_link">
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
};
