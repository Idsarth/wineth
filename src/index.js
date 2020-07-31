import React from 'react';
import ReactDOM from 'react-dom';

import Main from './main';
import { AuthProvider } from './context/auth.context'

import * as serviceWorker from './serviceWorker';
import './static/scss/styles.scss'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Main />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
