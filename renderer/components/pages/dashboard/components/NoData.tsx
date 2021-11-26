import React from 'react'
import { Box, Fade, Slide, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import Center from '../../../Center'

interface Props {
  title?: string,
  description?: string,
}

export default function NoData({ title, description }: Props) {
  const { t } = useTranslation('noDataComponent')

  return (
    <Center>
      <Slide in timeout={ 1000 }>
        <Stack alignItems="center" spacing={ 1 }>
          <Fade in timeout={ 1000 }>
            <Stack alignItems="center" spacing={ 1 }>
              <SentimentVerySatisfiedIcon color="success" fontSize="large"/>

              <Typography variant="h4" fontWeight={ 100 } sx={ { color: 'success' } }>
                { title ?? t('title') }
              </Typography>
            </Stack>
          </Fade>

          { description ?? (
            <Box overflow="hidden">
              <Fade in timeout={ 2000 }>
                <Typography variant="body1" color="gray">
                  { description ?? t('description') }
                </Typography>
              </Fade>
            </Box>
          ) }
        </Stack>
      </Slide>
    </Center>
  )
}
