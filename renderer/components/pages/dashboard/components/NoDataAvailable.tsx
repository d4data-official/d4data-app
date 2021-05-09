import React from 'react'
import { makeStyles } from '@material-ui/styles';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { Box } from '@material-ui/core';

interface Props {
  componentName: string;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    border: '2px solid #66bb6a',
    borderRadius: '10px',
    padding: '30px',
    paddingBottom: '10px',
    color: '#4caf50',
  },
  nda: {
    fontSize: '16pt',
    textAlign: 'center',
  },
  ndaTitle: {
    flex: 1,
  },
  descr: {
    marginTop: '-2%',
  },
  icon: {
    fontSize: '32pt',
  },
}));

export default function NoDataAvailable(props: Props) {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <Box className={ classes.box }>
        <div className={ classes.nda }>
          <SentimentVerySatisfiedIcon className={ classes.icon }/>
          <h2 className={ classes.ndaTitle }>No data available</h2>
          <p className={ classes.descr }>
            Awesome ! This service collected no
            {' '}
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {props.componentName}
            {' '}
            data about you !
          </p>
        </div>
      </Box>
    </div>
  )
}
