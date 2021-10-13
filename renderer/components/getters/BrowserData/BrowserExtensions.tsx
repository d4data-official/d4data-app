import { Extension } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Box, Grid } from '@mui/material'
import ExtensionCard from './BrowserExtensions/ExtensionCard'

export interface Props {
  data: Array<Extension>
}

export default function BrowserExtensions({ data }: Props) {
  return (
    <Box height={ 1 } padding={ 4 } display="flex" flexWrap="wrap" overflow="auto">
      <Grid container spacing={ 4 } justifyContent="center">
        {
          data.map((extension) => (
            <Grid item>
              <ExtensionCard data={ extension } key={ extension.name }/>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}
