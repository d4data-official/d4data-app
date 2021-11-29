import React, { useMemo } from 'react'
import { Paper, Stack, Typography } from '@mui/material'
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas'
import { useTranslation } from 'react-i18next'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'

const E7 = 10000000

export default function LocationHistory({ whereabouts }: {
  whereabouts: Array<Whereabout>
}) {
  const { t } = useTranslation(['common', 'getters'])

  const data = useMemo(() => whereabouts.map((location) => {
    const latitude = location?.location?.absolutePosition?.latitude
    const longitude = location?.location?.absolutePosition?.longitude

    return {
      ...location,
      recordDate: location?.recordDate?.toString(),
      relativePosition: location?.location?.relativePosition?.raw,
      latitude: latitude ? latitude / E7 : undefined,
      longitude: longitude ? longitude / E7 : undefined,
    }
  }), [])

  const columns: Array<ColumnData> = [
    {
      dataKey: 'recordDate',
      label: t('common:date'),
    },
    {
      dataKey: 'relativePosition',
      label: t('common:address'),
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

  return (
    <Stack height={ 1 } spacing={ 2 }>
      <Typography variant="h5" color="primary">
        { t('common:found', {
          count: data.length,
          entity: t('getters:whereabouts', { count: data.length }).toLowerCase(),
          context: 'female',
        }) }
      </Typography>

      <Paper variant="outlined" sx={ { flexGrow: 1, height: 1 } }>
        <VirtualizedTable columns={ columns } data={ data }/>
      </Paper>
    </Stack>
  )
}
