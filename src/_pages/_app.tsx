import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  // QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { NextPageContext, NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ThemeProvider } from 'theme-ui'

import ErrorFallback from '~components/ErrorFallback'
import MainTemplate from '~components/Template/Main'
import Global from '~theme/global'
import theme from '~theme/theme'

// interface ForGetInitialProps {
//   Component: NextComponentType
//   ctx: NextPageContext
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 1000 * 60 * 5,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // suspense: true,
      useErrorBoundary: true,
    },
  },
})

const RootApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Boilerplate with Nextjs</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen />

          <ThemeProvider theme={theme}>
            <Global />

            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense
                fallback={<div>🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨Loading 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨</div>}
              >
                <MainTemplate>
                  <Component {...pageProps.props} />
                </MainTemplate>
              </Suspense>
            </ErrorBoundary>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

// RootApp.getInitialProps = async ({ Component, ctx }: ForGetInitialProps) => {
//   let pageProps = {}
//
//   if (Component.getInitialProps) pageProps = await Component.getInitialProps({ ...ctx })
//
//   return { pageProps }
// }

export default RootApp
