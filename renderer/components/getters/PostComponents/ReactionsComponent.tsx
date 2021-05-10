import React from 'react';
import { Reaction } from '@d4data/archive-lib/src/types/schemas'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SmsFailed from '@material-ui/icons/SmsFailed';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

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
});

export default function ReactionsComponent({ data }: { data: NonNullable<Array<Reaction>> }) {
  const classes = useStyles();
  return (
    <Accordion className={ classes.box }>
      <AccordionSummary
        expandIcon={ <ExpandMoreIcon /> }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={ classes.heading }>Reactions ({ data.length })</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table className={ classes.reactions } aria-label="simple table">
            <TableBody>
              {data.map((row) => (
                <TableRow key="name" >
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}
