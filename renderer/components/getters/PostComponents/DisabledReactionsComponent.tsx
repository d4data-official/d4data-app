import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '10px 20px',
  },
  title: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 12,
  },
  pos: {
    fontSize: 10,
  },
  heading: {
    fontSize: 15,
  },
  reactions: {
    width: '100%',
    marginBottom: 10,
  },
  box: {
    boxShadow: 'none',
  },
});

export default function DisabledReactionsComponent() {
  const classes = useStyles();

  return (
    <Accordion className={ classes.box } disabled>
      <AccordionSummary
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography className={ classes.heading }>No reactions</Typography>
      </AccordionSummary>
    </Accordion>
  )
}
