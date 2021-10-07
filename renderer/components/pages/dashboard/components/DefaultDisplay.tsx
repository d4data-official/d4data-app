import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import React from 'react'
import ReactJson from 'react-json-view-ssr'
import { Box, Typography } from '@material-ui/core'

export interface Props {
  data: NonNullable<GetterData<any>>
  // Message indicating that this is a fallback display
}

export default function DefaultDisplay({ data }: Props) {
  return (
    <Box height={ 1 } width={ 1 } padding={ 2 }>
      <Typography variant="h5">Fallback display</Typography>
      <Typography variant="body2" mb={ 2 }>Custom display for this data type coming soon</Typography>

      <ReactJson
        name={ false }
        src={ data.data }
      />
    </Box>
  )
}
