import React from 'react'
// import Head from 'next/head'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    paddingBottom: theme.spacing(4),
  },
}))

const Home = () => {
  const classes = useStyles({})
  const router = useRouter();

  return (
    <>
      {/* <Head>
        <title>D4Data App</title>
      </Head> */}
      <div className={classes.root}>
        We still have got a damn lot of work to do
      </div>
      <button type="button" onClick={() => { router.push('/dashboard') }}>Go to dashboard</button>
      {/* <div className={classes.root}> */}
      {/* </div> */}
    </>
  )
}

export default Home
