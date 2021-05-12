import React from 'react'
import { makeStyles } from '@material-ui/styles';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
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
    border: '2px solid #3c59da',
    borderRadius: '10px',
    padding: '30px',
    paddingBottom: '10px',
    color: '#2511dd',
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
      <span>It seems that this service collected some</span>
      <span>
        {' '}
        { componentName }
        {' '}
      </span>
      <span>data about you...</span>
    </div>
  );
}

export default function Loading({ componentName, title, description }: Props) {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <Box className={ classes.box }>
        <div className={ classes.nda }>
          <SentimentVerySatisfiedIcon className={ classes.icon }/>
          <h2 className={ classes.ndaTitle }>{ title ?? 'Loading' }</h2>
          {description ?? <GenerateDefaultDescription componentName={ componentName } />}
        </div>
      </Box>
    </div>
  )
}
