import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Import routes
import routes from './routes'

const Main = () => {
  return (
    <Router>
      <Switch>
        {routes.map(route => (
          <Route 
            key={route.path}
            path={route.path}
            exact={route.exact}
            render={props => (
              <route.layout>
                <route.component {...props} />
              </route.layout>
            )}
          />
        ))}
      </Switch>
    </Router>
  )
}

export default Main
