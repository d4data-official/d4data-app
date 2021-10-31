import { Box, Paper, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
import type { Event } from '@d4data/archive-lib/dist/src/types/schemas'
import useGetter from '../../../hooks/getter/useGetter'
import Getters from '../../../../../d4data-archive-lib/dist/src/types/standardizer/Getters'
import Loading from '../../pages/dashboard/components/Loading'
import NoDataAvailable from '../../pages/dashboard/components/NoDataAvailable'
import ErrorAlert from '../../ErrorAlert'

const columns: Array<GridColDef> = [
  {
    headerName: 'Type',
    field: 'type',
    type: 'string',
    minWidth: 200,
    flex: 1,
  },
  {
    headerName: 'Date',
    field: 'date',
    minWidth: 200,
    valueFormatter: (params) => (params.value as Event['date'])?.toLocaleString(),
  },
]

export default function EventsList() {
  const theme = useTheme()
  const { data, loading, error } = useGetter<Array<Event>>(Getters.EVENTS, {
    parsingOptions: {
      pagination: {
        offset: 0,
        items: Infinity,
      },
    },
  })

  const rows = useMemo(() => data?.data
    ?.map((event, index) => ({ id: index, ...event })), [data])

  if (error) {
    return <ErrorAlert error={ error }/>
  }

  if (loading) {
    return (
      <Loading/>
    )
  }

  if (data === null || data?.data === null) {
    return (
      <NoDataAvailable/>
    )
  }

  return (
    <Box
      height={ 1 }
      paddingTop={ 2 }
      display="flex"
      flexDirection="column"
      overflow="auto"
    >
      <Paper variant="outlined" sx={ { height: 1 } }>
        <DataGrid
          rows={ rows! }
          columns={ columns }
          loading={ loading }
          density="compact"
          components={ { Toolbar: GridToolbar } }
          style={ { backgroundColor: theme.palette.background.default } }
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  )
}
