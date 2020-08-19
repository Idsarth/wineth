import React from 'react'
import ReactDOM from 'react-dom'

import { AuthProvider } from './context/auth.context'

import Main from './main'
import Boundary from './exceptions/boundary.component'

import ErrorPage from './pages/error.page'

import * as serviceWorker from './serviceWorker'
import './static/scss/styles.scss'

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}
console.log(b64_to_utf8('KF+XKTxBubeZI6OhD18w/LJkZ6Aysj9I+QKmCJ0ym9o='))

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
