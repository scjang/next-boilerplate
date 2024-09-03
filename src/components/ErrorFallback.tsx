import React from 'react'
import { FallbackProps } from 'react-error-boundary'

const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div role={'alert'}>
      🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 Error 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

export default ErrorFallback
