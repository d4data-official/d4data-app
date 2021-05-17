import { Preference } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Box } from '@material-ui/core'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
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
  elevation: 2,
  pagination: false,
  selectableRows: 'none',
  filter: 'false',
  responsive: 'simple',
}

export default function BrowserSettings({ data }: Props) {
  return (
    <Box height={ 1 } padding={ 4 } overflow="auto">
      <MUIDataTable
        title=""
        data={ data }
        columns={ useTableColumns(columns) }
        options={ options }
      />
    </Box>
  )
}
