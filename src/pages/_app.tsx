import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextPageContext, NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { ThemeProvider } from 'theme-ui'

import MainTemplate from '~components/Template/Main'
import Global from '~theme/global'
import theme from '~theme/theme'

interface ForGetInitialProps {
  Component: NextComponentType
  ctx: NextPageContext
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 1000 * 60 * 5,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
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
        <ReactQueryDevtools initialIsOpen />
        <ThemeProvider theme={theme}>
          <Global />
          <MainTemplate>
            <Component {...pageProps.props} />
          </MainTemplate>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

RootApp.getInitialProps = async ({ Component, ctx }: ForGetInitialProps) => {
  let pageProps = {}

  if (Component.getInitialProps) pageProps = await Component.getInitialProps({ ...ctx })

  return { pageProps }
}

export default RootApp
