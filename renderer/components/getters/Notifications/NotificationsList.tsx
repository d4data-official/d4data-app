import { Box, Button, Paper, Tooltip } from '@mui/material'
import type { Notification } from '@d4data/archive-lib/dist/src/types/schemas'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { useTranslation } from 'react-i18next'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'
import openInBrowser from '../../../modules/openInBrowser'
import Center from '../../Center'

export interface Props {
  data: NonNullable<GetterData<Notification>>
}

export default function NotificationsList({ data }: Props) {
  const { t } = useTranslation(['common', 'getters'])

  const columns: Array<ColumnData> = [
    {
      dataKey: 'content',
      label: t('getters:notifications', { count: 1 }),
    },
    {
      dataKey: 'href',
      label: t('common:url'),
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
            >{ t('common:open') }
            </Button>
          </Tooltip>
        </Center>
      ),
    },
    {
      dataKey: 'notificationDate',
      label: t('common:date'),
      cellRender: (date: Notification['notificationDate']) => date?.toLocaleString(),
    },
  ]

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
