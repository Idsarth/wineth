import React, { } from 'react'
import { Route, Redirect } from 'react-router-dom'

// Import hooks
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth()

  const handle = (routeProps) => {
    if (isLoggedIn) return <Component {...routeProps} />

    return <Redirect to='/sign-in' />
  }

return <Route {...rest} render={handle} />
}

export default PrivateRoute
