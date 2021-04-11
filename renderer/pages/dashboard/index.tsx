import React from 'react'
import Head from 'next/head'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  },
}))

const Dashboard = () => {
  const classes = useStyles({})
  const router = useRouter()

  return (
    <>
      <Head>
        <title>D4Data App</title>
      </Head>
      <div className={classes.root}>
        We still have got a damn lot of work to do in the dashboard
      </div>
      <div className={classes.root}>
        <button type="button" onClick={() => { router.push('/home') }}>Get back home</button>
      </div>
    </>
  )
}

export default Dashboard
