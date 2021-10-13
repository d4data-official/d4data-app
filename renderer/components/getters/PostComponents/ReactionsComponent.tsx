import React from 'react'
import { Reaction } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@mui/styles'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SmsFailed from '@mui/icons-material/SmsFailed'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

const useStyles = makeStyles({
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
})

export default function ReactionsComponent({ data }: { data: NonNullable<Array<Reaction>> }) {
  const classes = useStyles()
  return (
    <Accordion className={ classes.box }>
      <AccordionSummary
        expandIcon={ <ExpandMoreIcon/> }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={ classes.heading }>Reactions ({ data.length })</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table className={ classes.reactions } aria-label="simple table">
            <TableBody>
              { data.map((row, idx) => (
                <TableRow key={ idx.toString() }>
                  <TableCell component="th" scope="row">
                    <SmsFailed/>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    { row.name ?? 'No name provided' }
                  </TableCell>
                  <TableCell component="th" scope="row">
                    { row?.description ?? 'No description provided' }
                  </TableCell>
                  <TableCell align="right">{ row?.reactionDate }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}
