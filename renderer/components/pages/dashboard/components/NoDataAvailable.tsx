import React from 'react'
import { makeStyles } from '@material-ui/styles';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { Box } from '@material-ui/core';

interface Props {
  componentName: string,
  title?: string,
  description?: string,
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

function GenerateDefaultDescription({ componentName }:any) {
  const classes = useStyles();

  return (
    <div className={ classes.descr }>
      <span>Awesome ! This service collected no</span>
      <span>
        {' '}
        { componentName }
        {' '}
      </span>
      <span>data about you !</span>
    </div>
  );
}

export default function NoDataAvailable({ componentName, title, description }: Props) {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <Box className={ classes.box }>
        <div className={ classes.nda }>
          <SentimentVerySatisfiedIcon className={ classes.icon }/>
          <h2 className={ classes.ndaTitle }>{ title ?? 'No data available' }</h2>
          {description ?? <GenerateDefaultDescription componentName={ componentName } />}
        </div>
      </Box>
    </div>
  )
}
