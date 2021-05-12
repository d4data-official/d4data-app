import React from 'react';
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import SmsFailed from '@material-ui/icons/SmsFailed';
import TableContainer from '@material-ui/core/TableContainer';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';

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

const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme: Theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Reacteds({ data }: { data: NonNullable<GetterData<Array<Reacted>>> }) {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <TableContainer>
        <Table className={ classes.reactions } aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Icon</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.data.map((row, idx) => (
              <TableRow key={ idx.toString() } >
                <TableCell component="th" scope="row">
                  <SmsFailed/>
                </TableCell>
                <TableCell component="th" scope="row">
                  { row.reaction.name ?? 'No name provided' }
                </TableCell>
                <TableCell component="th" scope="row">
                  { row.reaction.description ?? 'No description provided' }
                </TableCell>
                <TableCell align="right">{ row.reaction.reactionDate ?? 'No date provided' }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
