import { Component } from 'react'

import ErrorFallback from '../ErrorFallback/ErrorFallback'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message }
  }

  resetError = () => {
    this.setState({ hasError: false })
  }

  render() {
    const { children } = this.props
    const { hasError, message } = this.state
    if (!hasError) {
      return <>{children}</>
    }
    return <ErrorFallback message={message} resetError={this.resetError} />
  }
}

export default ErrorBoundary
