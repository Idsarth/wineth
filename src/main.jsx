import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Import routes
import Private from './routes/private.route'

// Import pages
import HomePage from './pages/home.page'
import SignInPage from './pages/signin.page'

const Main = () => {

  return (
    <Router>
      <Switch>
        <Route exact path='/sign-in' component={SignInPage} />
        <Private exact path='/' component={HomePage} />
      </Switch>
    </Router>
  )
}

export default Main
