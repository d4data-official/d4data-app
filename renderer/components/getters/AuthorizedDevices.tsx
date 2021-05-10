import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { AuthorizedDevice } from '@d4data/archive-lib/src/types/schemas'
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export interface Props {
  data: NonNullable<GetterData<Array<AuthorizedDevice>>>
}

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function AuthorizedDevices({ data }: { data: NonNullable<GetterData<Array<AuthorizedDevice>>> }) {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          {`${ data.data.length } authorized devices found`}
        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>IP</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row) => {
                const device = row;
                return (
                  <StyledTableRow key={ row.name }>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { device.name }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { device.ip }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { device.authorizationDate }
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
