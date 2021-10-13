import { Preference } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Box, Paper } from '@mui/material'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'

export interface Props {
  data: Array<Preference>
}

const columns: Array<ColumnData> = [
  {
    dataKey: 'name',
    label: 'Name',
    width: 225,
  },
  {
    dataKey: 'value',
    label: 'Value',
  },
]

export default function BrowserSettings({ data }: Props) {
  return (
    <Box height={ 1 } padding={ 4 } overflow="auto">
      <Paper variant="outlined" sx={ { height: 1 } }>
        <VirtualizedTable columns={ columns } data={ data }/>
      </Paper>
    </Box>
  )
}
