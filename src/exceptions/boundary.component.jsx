import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children, fallback } = this.props
    if(hasError) return fallback
    return children
  }
}

export default ErrorBoundary
