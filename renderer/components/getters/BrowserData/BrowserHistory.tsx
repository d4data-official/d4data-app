import { History } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { Box, Button, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import openInBrowser from '../../../modules/openInBrowser'
import useTableColumns, { TableColumn } from '../../../modules/hooks/useTableColumns'

export interface Props {
  data: Array<History>
}

const columns: Array<TableColumn> = [
  {
    name: 'faviconUrl',
    label: 'Icon',
    options: {
      customBodyRender: (url) => url && (
        <Tooltip title={ url } placement="bottom-start">
          <img src={ url } alt="favicon" style={ { maxWidth: 32 } }/>
        </Tooltip>
      ),
    },
  },
  {
    name: 'title',
    label: 'Title',
    options: {
      filterType: 'textField',
    },
  },
  {
    name: 'url',
    label: 'URL',
    options: {
      filter: false,
      customBodyRender: (url) => (
        <Box textAlign="center">
          <Tooltip title={ url } placement="bottom">
            <Button variant="outlined" color="primary" onClick={ () => openInBrowser(url) }>Open</Button>
          </Tooltip>
        </Box>
      ),
    },
    alignHeader: 'center',
  },
  {
    name: 'datetime',
    label: 'Date',
    options: {
      customBodyRender: (value) => <span>{ new Date(value).toLocaleString() }</span>,
    },
  },
  {
    name: 'clientId',
    label: 'Client id',
    options: {
      filterType: 'multiselect',
    },
  },
]

const options: MUIDataTableOptions = {
  rowsPerPage: 5,
  elevation: 0,
  selectableRows: 'none',
}

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
    <Box className={ classes.root } height={ 1 } display="flex" flexDirection="column">
      <Box flexGrow={ 1 }>
        <MUIDataTable
          title=""
          data={ data }
          columns={ useTableColumns(columns) }
          options={ options }
        />
      </Box>
    </Box>
  )
}
