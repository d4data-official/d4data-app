import React from 'react'
import { makeStyles } from '@mui/styles'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'

const useStyles = makeStyles({
  heading: {
    fontSize: 15,
  },
  box: {
    boxShadow: 'none',
  },
})

export default function DisabledReactionsComponent() {
  const classes = useStyles()

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
