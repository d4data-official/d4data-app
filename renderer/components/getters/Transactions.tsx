import { Transaction } from '@d4data/archive-lib/dist/src/types/schemas'
import React, { useState } from 'react'
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
import { Tab, Tabs } from '@material-ui/core'
import { History, Timeline } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'

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
  const [currentTab, setCurrentTab] = useState(0)

  const getTabContent = () => {
    switch (currentTab) {
      case 0:
        return <AutoStatisticPage getter={ Getters.TRANSACTIONS }/>
      case 1:
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
      default:
        return undefined
    }
  }

  return (
    <Box width={ 1 } flexGrow={ 1 } display="flex" flexDirection="column">
      <Box padding={ 0 } paddingBottom={ 0 }>
        <Tabs
          value={ currentTab }
          onChange={ (event, newValue) => setCurrentTab(newValue) }
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={ {
            minHeight: 72,
            '& .Mui-selected': {
              background: grey['50'],
            },
          } }
        >
          <Tab icon={ <Timeline/> } label="History stat"/>
          <Tab icon={ <History/> } label="Transactions"/>
        </Tabs>
      </Box>

      { getTabContent() }
    </Box>
  )
}
