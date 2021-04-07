import React from 'react'
import Head from 'next/head'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  },
}))

const Home = () => {
  const classes = useStyles({})

  return (
    <>
      <Head>
        <title>D4Data App</title>
      </Head>
      <div className={classes.root}>
        We still have got a damn lot of work to do
      </div>
    </>
  )
}

export default Home
