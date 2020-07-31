import Layout from '../layout'

// Import pages
import HomePage from '../pages/home.page'
import SignInPage from '../pages/signin.page'

const routes = [
  {
    path: '/',
    layout: Layout,
    component: HomePage,
    exact: true
  },
  {
    path: '/sign-in',
    layout: Layout,
    component: SignInPage,
    exact: true
  }, 
]

export default routes
