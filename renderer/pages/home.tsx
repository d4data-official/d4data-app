/* eslint-disable max-len */
/* eslint-disable no-tabs */
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { withRouter } from 'next/router';
import Dropzone from 'pages-components/home/components/Dropzone'

function MainPage() {
  const handleExtract = React.useCallback((path: string) => {
    const rien = path;
    return rien;
  }, [])

  return (
    <Grid container justify="center" spacing={4} style={{ textAlign: 'center' }}>
      {/* <Grid item xs={12}>
        <div style={{
          marginTop: 30, marginBottom: 30, width: '100vw', display: 'flex', alignContent: 'center', justifyContent: 'center',
        }}
        >
          <img src="/images/assets/logo-grey.svg" alt="logo" width="19%" />
        </div>
      </Grid> */}
      <Grid item xs={8}>
        <Typography variant="h3" >
          Your data is important, take control of it.
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body2">
          {`D4Data helps you having a better understanding of your data.
					Even if you have nothing to hide, your digital fingerprint defines who you are.
					Thanks to European regulations (GDPR), all companies that gathered data about you,
					must supply a package containing all of those data on demand.
					The only problem is that those data are not human-readable.`}
        </Typography>

      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1">
          D4Data is the secure interface to convert non-human readable data to an intuitive user interface where anybody can understand its digital fingerprint.
        </Typography>

      </Grid>
      {/* <Extraction /> */}
      <Grid item xs={8}>
        <Dropzone onLoaded={handleExtract} />
      </Grid>
      {/* <History /> */}
    </Grid>
  )
}

const Main = withRouter(MainPage);

export { Main };
export default Main;
