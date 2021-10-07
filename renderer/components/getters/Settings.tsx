import { Setting } from '@d4data/archive-lib/dist/src/types/schemas'
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
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'

export interface Props {
  data: NonNullable<GetterData<Array<Setting>>>
}

export default function Settings({ data }: { data: NonNullable<GetterData<Array<Setting>>> }) {
  const Settings = (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { `${ data.data.length } settings found` }
        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table size="small" sx={ { minWidth: 700 } }>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.data.map((row) => {
                const setting = row
                return (
                  <TableRow key={ row.name }>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { setting.name }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { setting.value }
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
        { label: 'Settings stat', icon: <Timeline/> },
        { label: 'Settings list', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.SETTINGS }/>,
        Settings,
      ] }
    />
  )
}
