import { Box, Button, Paper, Tooltip } from '@mui/material'
import type { Notification } from '@d4data/archive-lib/dist/src/types/schemas'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'
import openInBrowser from '../../../modules/openInBrowser'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import Center from '../../Center'

export interface Props {
  data: NonNullable<GetterData<Notification>>
}

const columns: Array<ColumnData> = [
  {
    dataKey: 'content',
    label: 'Notification',
  },
  {
    dataKey: 'href',
    label: 'URL',
    alignHeader: 'center',
    width: 110,
    cellRender: (href: Notification['href']) => href && (
      <Center>
        <Tooltip title={ href } placement="bottom">
          <Button
            onClick={ () => openInBrowser(href) }
            variant="outlined"
            color="primary"
            size="small"
          >Open
          </Button>
        </Tooltip>
      </Center>
    ),
  },
  {
    dataKey: 'notificationDate',
    label: 'Date',
    cellRender: (date: Notification['notificationDate']) => date?.toLocaleString(),
  },
]

export default function NotificationsList({ data }: Props) {
  return (
    <Box
      height={ 1 }
      padding={ 4 }
      display="flex"
      flexDirection="column"
      overflow="auto"
      sx={ { '& button': { margin: 0 } } }
    >
      <Paper variant="outlined" sx={ { height: 1 } }>
        <VirtualizedTable columns={ columns } data={ data.data }/>
      </Paper>
    </Box>
  )
}
