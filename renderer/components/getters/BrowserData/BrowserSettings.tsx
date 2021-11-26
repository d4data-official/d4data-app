import { Preference } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Box, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'

export interface Props {
  data: Array<Preference>
}

export default function BrowserSettings({ data }: Props) {
  const { t } = useTranslation('common')

  const columns: Array<ColumnData> = [
    {
      dataKey: 'name',
      label: t('name'),
      width: 225,
    },
    {
      dataKey: 'value',
      label: t('value'),
    },
  ]

  return (
    <Box height={ 1 } padding={ 4 } overflow="auto">
      <Paper variant="outlined" sx={ { height: 1 } }>
        <VirtualizedTable columns={ columns } data={ data }/>
      </Paper>
    </Box>
  )
}
