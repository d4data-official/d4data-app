import { Transaction } from '@d4data/archive-lib/dist/src/types/schemas'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import { makeStyles } from '@material-ui/styles'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Trans from 'components/Translate'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'

export interface Props {
  data: NonNullable<GetterData<Array<Transaction>>>
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export default function Transactions({ data }: { data: NonNullable<GetterData<Array<Transaction>>> }) {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { `${ data.data.length } transactions found` }
        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><Trans page="common" section="item" /></TableCell>
                <TableCell><Trans page="common" section="price" /></TableCell>
                <TableCell><Trans page="common" section="paymentMethod" /></TableCell>
                <TableCell><Trans page="common" section="transactionStatus" /></TableCell>
                <TableCell><Trans page="common" section="transactionDate" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.data.map((row, idx) => {
                const transaction = row
                return (
                  <TableRow key={ idx.toString() }>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { transaction.product }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { `${ transaction.value } (${ transaction.currency })` }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { transaction.paymentMethod }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { transaction.status }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { transaction.date?.toLocaleString() ?? 'No date provided' }
                    </TableCell>
                  </TableRow>
                )
              }) }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
