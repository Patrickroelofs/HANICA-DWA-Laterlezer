/* eslint-disable no-undef */
import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './components/App';
import './css/tailwind.generated.css';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
