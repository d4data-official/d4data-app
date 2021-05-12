import { makeStyles } from '@material-ui/styles'
import React from 'react'
import ReactJson from 'react-json-view-ssr'

const useStyles = makeStyles({
  container: {
    height: '100%',
    overflow: 'scroll',
    margin: '10px',
    padding: '10px',
    width: '100%',
  },
});

export default function DefaultDisplay({ data }: { data: any }) {
  const classes = useStyles();
  return (
    <div className={ classes.container }>

      <ReactJson src={ data } style={ { display: 'flex', position: 'relative' } } />
    </div>
    // <div>{JSON.stringify(data)}</div>
  )
}
