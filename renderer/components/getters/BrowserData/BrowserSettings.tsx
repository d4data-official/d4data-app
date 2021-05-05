import { Preference } from 'd4data-archive-lib/dist/src/types/schemas/BrowserData'
import { Box } from '@material-ui/core'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { makeStyles } from '@material-ui/styles'
import useTableColumns, { TableColumn } from '../../../modules/hooks/useTableColumns'

export interface Props {
  data: Array<Preference>
}

const columns: Array<TableColumn> = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'value',
    label: 'Value',
  },
]

const options: MUIDataTableOptions = {
  elevation: 0,
  pagination: false,
  selectableRows: 'none',
  filter: 'false',
  responsive: 'simple',
}

const useStyles = makeStyles({
  root: {},
})

export default function BrowserSettings({ data }: Props) {
  const classes = useStyles()

  return (
    <Box className={ classes.root } height={ 1 }>
      <MUIDataTable
        title=""
        data={ data }
        columns={ useTableColumns(columns) }
        options={ options }
      />
    </Box>
  )
}
