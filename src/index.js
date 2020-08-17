import React from 'react'
import ReactDOM from 'react-dom'

import { AuthProvider } from './context/auth.context'

import Main from './main'
import Boundary from './exceptions/boundary.component'

import ErrorPage from './pages/error.page'

import * as serviceWorker from './serviceWorker'
import './static/scss/styles.scss'

ReactDOM.render(
  <React.StrictMode>
    <Boundary fallback={<ErrorPage />}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Boundary>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
