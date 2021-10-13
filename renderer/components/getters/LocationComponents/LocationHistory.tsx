import React, { useMemo } from 'react'
import { Paper, Stack, Typography } from '@mui/material'
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'

const E7 = 10000000

const columns: Array<ColumnData> = [
  {
    dataKey: 'recordDate',
    label: 'Date',
  },
  {
    dataKey: 'relativePosition',
    label: 'Address',
  },
  {
    dataKey: 'latitude',
    label: 'Latitude',
  },
  {
    dataKey: 'longitude',
    label: 'Longitude',
  },
]

export default function LocationHistory({ whereabouts }: { whereabouts: Array<Whereabout> }) {
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

  return (
    <Stack height={ 1 } spacing={ 2 }>
      <Typography variant="h5" color="primary">Whereabouts ({ data.length })</Typography>

      <Paper variant="outlined" sx={ { flexGrow: 1, height: 1 } }>
        <VirtualizedTable columns={ columns } data={ data }/>
      </Paper>
    </Stack>
  )
}
