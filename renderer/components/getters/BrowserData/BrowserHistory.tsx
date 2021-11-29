import { History } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Box, Button, Paper, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import openInBrowser from '../../../modules/openInBrowser'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'

export interface Props {
  data: Array<History>
}

const useStyles = makeStyles({
  root: {
    '& button': {
      margin: 0,
    },
  },
})

export default function BrowserHistory({ data }: Props) {
  const { t } = useTranslation(['common', 'BrowserHistory'])

  const classes = useStyles()

  const columns: Array<ColumnData> = [
    {
      dataKey: 'faviconUrl',
      label: t('common:icon'),
      width: 70,
      cellRender: (url: string) => url && (
        <Tooltip title={ url } placement="bottom-start">
          <img src={ url } alt="favicon" style={ { maxWidth: 32 } }/>
        </Tooltip>
      ),
    },
    {
      dataKey: 'title',
      label: t('common:title'),
    },
    {
      dataKey: 'url',
      label: t('common:url'),
      alignHeader: 'center',
      width: 110,
      cellRender: (url: string) => (
        <Box textAlign="center">
          <Tooltip title={ url } placement="bottom">
            <Button variant="outlined" color="primary" onClick={ () => openInBrowser(url) }>Open</Button>
          </Tooltip>
        </Box>
      ),
    },
    {
      dataKey: 'datetime',
      label: t('common:date'),
      cellRender: (cellData: Date) => cellData.toLocaleString(),
    },
    {
      dataKey: 'clientId',
      label: t('BrowserHistory:headers.clientId'),
    },
  ]

  return (
    <Box className={ classes.root } height={ 1 } padding={ 4 } display="flex" flexDirection="column" overflow="auto">
      <Paper variant="outlined" sx={ { height: 1 } }>
        <VirtualizedTable columns={ columns } data={ data }/>
      </Paper>
    </Box>
  )
}
