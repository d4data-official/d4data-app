import { Transaction } from '@d4data/archive-lib/dist/src/types/schemas'
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { useTranslation } from 'react-i18next'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'

export interface Props {
  data: NonNullable<GetterData<Array<Transaction>>>
}

export default function Transactions({ data }: { data: NonNullable<GetterData<Array<Transaction>>> }) {
  const { t } = useTranslation(['common', 'pages', 'getters'])

  const Transactions = (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { t('common:found', {
            count: data.data.length,
            entity: t('getters:transactions', { count: data.data.length }).toLowerCase(),
            context: 'female',
          }) }
        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table size="small" sx={ { minWidth: 700 } }>
            <TableHead>
              <TableRow>
                <TableCell>{ t('pages:transactions.headers.product') }</TableCell>
                <TableCell>{ t('pages:transactions.headers.price') }</TableCell>
                <TableCell>{ t('pages:transactions.headers.paymentMethod') }</TableCell>
                <TableCell>{ t('pages:transactions.headers.status') }</TableCell>
                <TableCell>{ t('pages:transactions.headers.date') }</TableCell>
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
        { label: t('common:stat'), icon: <Timeline/> },
        { label: t('common:list'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.TRANSACTIONS }/>,
        Transactions,
      ] }
    />
  )
}
