import { Transaction } from '@d4data/archive-lib/dist/src/types/schemas'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { List as ListIcon, Timeline } from '@material-ui/icons'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'

export interface Props {
  data: NonNullable<GetterData<Array<Transaction>>>
}

export default function Transactions({ data }: { data: NonNullable<GetterData<Array<Transaction>>> }) {
  const Transactions = (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { `${ data.data.length } transactions found` }
        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table size="small" sx={ { minWidth: 700 } }>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Price (Currency)</TableCell>
                <TableCell>Payment method</TableCell>
                <TableCell>Transaction status</TableCell>
                <TableCell>Transaction date</TableCell>
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

  return (
    <AutoTabs
      tabs={ [
        { label: 'Transaction stat', icon: <Timeline/> },
        { label: 'Transaction list', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.TRANSACTIONS }/>,
        Transactions,
      ] }
    />
  )
}
