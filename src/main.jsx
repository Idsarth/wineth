import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Import routes
import Private from './routes/private.route'

// Import layout
import Layout from './layout'

// Import pages
import HomePage from './pages/home.page'
import SignInPage from './pages/signin.page'
import SignUpPage from './pages/signup.page'
import PartnersPage from './pages/partners.page'
import ProfitPage from './pages/profit.page'
import NotFoundPage from './pages/not-found.page'

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/sign-in' component={SignInPage} />
        <Route exact path='/sign-up/:id?' component={SignUpPage} />
        <Layout>
          <Private exact path='/' component={HomePage} />
          <Private exact path='/partners/:id' component={PartnersPage} />
          <Private exact path='/profits/:id' component={ProfitPage} />
        </Layout>
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default Main
