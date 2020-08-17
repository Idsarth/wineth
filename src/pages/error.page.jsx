import React from 'react'
import { Link } from 'react-router-dom'

// Import components
import Button from '../components/button.component'

const ErrorPage = () => {
  return (
    <div>
      <p>Opppsss, ocurrio un error</p>

      <Link to='/'>
        <Button message='Sacame de aqui' onClick={() => {}} />
      </Link>
    </div>
  )
}

export default ErrorPage
