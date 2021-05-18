import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Skeleton from 'components/pages/_app/components/Skeleton'
import Store, { GlobalContext } from 'renderer/context/Store'
import themeDark from '../themeDark'
import themeLight from '../themeLight'
import type { AppProps } from 'next/app'
import '../style.css'

function AppContent(props: AppProps) {
  const { currentTheme } = useContext(GlobalContext)
  const { Component, pageProps } = props;
  return (
    <ThemeProvider theme={ currentTheme === 'light' ? themeLight : themeDark }>
      <SnackbarProvider autoHideDuration={ 5000 }>
        <CssBaseline/>
        <Skeleton>
          <Component { ...pageProps }/>
        </Skeleton>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default function App(props: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <title>D4Data App</title>
      </Head>
      <Store>
        <AppContent { ...props }/>
      </Store>
    </>
  )
}
