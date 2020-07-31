import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Import routes
import Private from './routes/private.route'

// Import layout
import Layout from './layout'

// Import pages
import HomePage from './pages/home.page'
import SignInPage from './pages/signin.page'

const Main = () => {

  return (
    <Router>
      <Switch>
        <Route exact path='/sign-in' component={SignInPage} />
        <Layout>
          <Private exact path='/' component={HomePage} />
        </Layout>
      </Switch>
    </Router>
  )
}

export default Main
