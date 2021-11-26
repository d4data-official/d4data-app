import React from 'react'
import { Box, CircularProgress, Fade, Stack, Typography } from '@mui/material'
import Center from '../../../Center'

interface Props {
  title?: string,
  description?: string,
}

export default function Loading({ title, description }: Props) {
  return (
    <Center>
      <Stack alignItems="center" spacing={ 1 }>
        <Fade in timeout={ 1000 }>
          <Stack alignItems="center" spacing={ 1 }>
            <CircularProgress variant="indeterminate" size={ 50 }/>
            <Typography variant="h4" fontWeight={ 100 }>{ title ?? 'Loading' }</Typography>
          </Stack>
        </Fade>

        { description ?? (
          <Box overflow="hidden">
            <Fade in timeout={ 2000 }>
              <Typography variant="body1" color="gray">It seems that this service collected some data about you in this
                category...
              </Typography>
            </Fade>
          </Box>
        ) }
      </Stack>
    </Center>
  )
}
