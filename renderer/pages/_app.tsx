import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import type { AppProps } from 'next/app'
import theme from 'lib/theme'
import Skeleton from 'components/pages/_app/components/Skeleton'

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>D4Data App</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Skeleton>
          <Component {...pageProps} />
        </Skeleton>
      </ThemeProvider>
    </>
  )
}
