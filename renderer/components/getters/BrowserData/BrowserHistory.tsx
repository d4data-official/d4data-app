import { History } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Box, Button, Paper, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import openInBrowser from '../../../modules/openInBrowser'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'

export interface Props {
  data: Array<History>
}

const columns: Array<ColumnData> = [
  {
    dataKey: 'faviconUrl',
    label: 'Icon',
    width: 70,
    cellRender: (url: string) => url && (
      <Tooltip title={ url } placement="bottom-start">
        <img src={ url } alt="favicon" style={ { maxWidth: 32 } }/>
      </Tooltip>
    ),
  },
  {
    dataKey: 'title',
    label: 'Title',
  },
  {
    dataKey: 'url',
    label: 'URL',
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
    label: 'Date',
    cellRender: (cellData: Date) => cellData.toLocaleString(),
  },
  {
    dataKey: 'clientId',
    label: 'Client id',
  },
]

const useStyles = makeStyles({
  root: {
    '& button': {
      margin: 0,
    },
  },
})

export default function BrowserHistory({ data }: Props) {
  const classes = useStyles()

  return (
    <Box className={ classes.root } height={ 1 } padding={ 4 } display="flex" flexDirection="column" overflow="auto">
      <Paper variant="outlined" sx={ { height: 1 } }>
        <VirtualizedTable columns={ columns } data={ data }/>
      </Paper>
    </Box>
  )
}
