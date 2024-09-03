'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { ReactNode, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ThemeProvider } from 'theme-ui'

import ErrorFallback from '~components/ErrorFallback'
import Global from '~theme/global'
import theme from '~theme/theme'

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            cacheTime: 1000 * 60 * 5,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            suspense: true,
            useErrorBoundary: true,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global />

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<div>....Loading....</div>}>{children}</Suspense>
        </ErrorBoundary>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default Providers
