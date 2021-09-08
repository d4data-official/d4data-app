import React, { useMemo } from 'react'
import { Paper, Stack, Typography } from '@material-ui/core'
import type { Connection } from '@d4data/archive-lib/dist/src/types/schemas'
import VirtualizedTable, { ColumnData } from '../../VirtualizedTable'

const columns: Array<ColumnData> = [
  {
    dataKey: 'date',
    label: 'Date',
  },
  {
    dataKey: 'ipAddress',
    label: 'IP address',
  },
  {
    dataKey: 'browser',
    label: 'Browser',
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

export default function ConnectionHistory({ whereabouts }: { whereabouts: Array<Connection> }) {
  const data = useMemo(() => whereabouts.map((location) => ({
    ...location,
    date: location.timestamp.toString(),
    latitude: location?.location?.absolutePosition?.latitude,
    longitude: location?.location?.absolutePosition?.longitude,
  })), [])

  return (
    <Stack height={ 1 } spacing={ 2 }>
      <Typography variant="h5" color="primary">Connections ({ data.length })</Typography>

      <Paper variant="outlined" sx={ { flexGrow: 1, height: 1 } }>
        <VirtualizedTable columns={ columns } data={ data }/>
      </Paper>
    </Stack>
  )
}
