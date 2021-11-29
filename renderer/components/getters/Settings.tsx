import { Setting } from '@d4data/archive-lib/dist/src/types/schemas'
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
import { Tooltip } from '@mui/material'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { useTranslation } from 'react-i18next'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'

export interface Props {
  data: NonNullable<GetterData<Array<Setting>>>
}

export default function Settings({ data }: { data: NonNullable<GetterData<Array<Setting>>> }) {
  const { t } = useTranslation(['common', 'getters'])

  const Settings = (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { t('common:found', {
            count: data.data.length,
            entity: t('getters:settings', { count: data.data.length }).toLowerCase(),
          }) }

        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table size="small" sx={ { minWidth: 700 } }>
            <TableHead>
              <TableRow>
                <TableCell>{ t('common:name') }</TableCell>
                <TableCell>{ t('common:description') }</TableCell>
                <TableCell>{ t('common:value') }</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.data.map((setting) => {
                const name = setting.friendlyName ? (
                  <Tooltip title={ `Key: ${ setting.key }` }><span>{ setting.friendlyName }</span></Tooltip>
                ) : setting.key

                return (
                  <TableRow key={ setting.key }>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { name }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { setting.description }
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
        { label: t('common:stat'), icon: <Timeline/> },
        { label: t('common:list'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.SETTINGS }/>,
        Settings,
      ] }
    />
  )
}
