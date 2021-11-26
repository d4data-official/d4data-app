import { API } from '@d4data/archive-lib/dist/src/types/schemas'
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { makeStyles } from '@mui/styles'
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
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'

export interface Props {
  data: NonNullable<GetterData<Array<API>>>
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export default function APIs({ data }: { data: NonNullable<GetterData<Array<API>>> }) {
  const { t } = useTranslation(['common', 'pages'])

  const classes = useStyles()

  const DataTable = (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { t('pages:apis.title', { count: data.data.length }) }
        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>{ t('common:name') }</TableCell>
                <TableCell>{ t('common:username') }</TableCell>
                <TableCell>{ t('common:date') }</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.data.map((row) => {
                const api = row
                return (
                  <TableRow key={ row.name }>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { api.name }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { api.username }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { api.linkingDate?.toLocaleString() ?? 'No date provided' }
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
        <AutoStatisticPage getter={ Getters.APIS }/>,
        DataTable,
      ] }
    />
  )
}
