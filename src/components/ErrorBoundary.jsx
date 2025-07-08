import { Component } from 'react'
import { motion } from 'framer-motion'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <motion.div
            className="error-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>🎂 Oops! Something went wrong</h2>
            <p>Don't worry, the birthday celebration continues!</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              🔄 Refresh Page
            </button>
          </motion.div>
          
          <style jsx>{`
            .error-boundary {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 50vh;
              padding: var(--spacing-xl);
              text-align: center;
            }
            
            .error-content {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              border-radius: var(--radius-lg);
              padding: var(--spacing-xl);
              border: 2px solid rgba(255, 255, 255, 0.2);
              max-width: 400px;
            }
            
            .error-content h2 {
              color: var(--text-primary);
              margin-bottom: var(--spacing-md);
              font-family: var(--font-script);
            }
            
            .error-content p {
              color: var(--text-secondary);
              margin-bottom: var(--spacing-lg);
            }
          `}</style>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
