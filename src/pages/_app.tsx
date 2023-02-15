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

const RootApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Boilerplate with Nextjs</title>
      </Head>

      <ThemeProvider theme={theme}>
        <Global />
        <MainTemplate>
          <Component {...pageProps.props} />
        </MainTemplate>
      </ThemeProvider>
    </>
  )
}

RootApp.getInitialProps = async ({ Component, ctx }: ForGetInitialProps) => {
  let pageProps = {}

  if (Component.getInitialProps) pageProps = await Component.getInitialProps({ ...ctx })

  return { pageProps }
}

export default RootApp
