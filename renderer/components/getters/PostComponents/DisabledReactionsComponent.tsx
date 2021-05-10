import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  heading: {
    fontSize: 15,
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
