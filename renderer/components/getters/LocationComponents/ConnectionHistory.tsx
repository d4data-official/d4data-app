import React, { useMemo } from 'react'
import { Paper, Stack, Typography } from '@mui/material'
import type { Connection } from '@d4data/archive-lib/dist/src/types/schemas'
import { useTranslation } from 'react-i18next'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'

export default function ConnectionHistory({ whereabouts }: { whereabouts: Array<Connection> }) {
  const { t } = useTranslation(['common', 'getters'])

  const columns: Array<ColumnData> = [
    {
      dataKey: 'date',
      label: t('common:date'),
    },
    {
      dataKey: 'ipAddress',
      label: t('common:ip'),
    },
    {
      dataKey: 'browser',
      label: t('common:browser'),
    },
    {
      dataKey: 'latitude',
      label: t('common:latitude'),
    },
    {
      dataKey: 'longitude',
      label: t('common:longitude'),
    },
  ]

  const data = useMemo(() => whereabouts.map((location) => ({
    ...location,
    date: location.timestamp.toString(),
    latitude: location?.location?.absolutePosition?.latitude,
    longitude: location?.location?.absolutePosition?.longitude,
  })), [])

  return (
    <Stack height={ 1 } spacing={ 2 }>
      <Typography variant="h5" color="primary">{ t('getters:connections') } ({ data.length })</Typography>

      <Paper variant="outlined" sx={ { flexGrow: 1, height: 1 } }>
        <VirtualizedTable columns={ columns } data={ data }/>
      </Paper>
    </Stack>
  )
}
