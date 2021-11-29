import React from 'react'
import { Box, CircularProgress, Fade, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Center from '../../../Center'

interface Props {
  title?: string,
  description?: string,
}

export default function Loading({ title, description }: Props) {
  const { t } = useTranslation('loadingComponent')

  return (
    <Center>
      <Stack alignItems="center" spacing={ 1 }>
        <Fade in timeout={ 1000 }>
          <Stack alignItems="center" spacing={ 1 }>
            <CircularProgress variant="indeterminate" size={ 50 }/>
            <Typography variant="h4" fontWeight={ 100 }>{ title ?? t('title') }</Typography>
          </Stack>
        </Fade>

        { description ?? (
          <Box overflow="hidden">
            <Fade in timeout={ 2000 }>
              <Typography variant="body1" color="gray">{ t('description') }</Typography>
            </Fade>
          </Box>
        ) }
      </Stack>
    </Center>
  )
}
