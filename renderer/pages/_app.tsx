import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import theme from 'lib/theme';
import { registerStore } from 'lib/redux';

export default function App({ Component, pageProps }: AppProps) {
  const [store, setStore] = React.useState<Store<any, AnyAction>>();

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    registerStore('communication-channel', (storeInstance) => {
      setStore(storeInstance);
    });
  }, [setStore]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>D4Data App</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {store && (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        )}
      </ThemeProvider>
    </>
  );
}
