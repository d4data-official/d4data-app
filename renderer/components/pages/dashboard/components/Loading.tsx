import React from 'react'
import { makeStyles } from '@material-ui/styles';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import { Box, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

interface Props {
  title?: string,
  description?: string,
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    border: '2px solid',
    borderColor: grey[500],
    borderRadius: '10px',
    padding: '30px',
    paddingBottom: '10px',
    color: grey[500],
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
});

function GenerateDefaultDescription() {
  const classes = useStyles();

  return (
    <div className={ classes.descr }>
      <span>It seems that this service collected some data about you in this category...</span>
    </div>
  );
}

export default function Loading({ title, description }: Props) {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <Box className={ classes.box }>
        <div className={ classes.nda }>
          <SentimentVerySatisfiedIcon className={ classes.icon } />
          <h2 className={ classes.ndaTitle }>{title ?? 'Loading'}</h2>
          {description ?? <GenerateDefaultDescription />}
        </div>
      </Box>
    </div>
  )
}
