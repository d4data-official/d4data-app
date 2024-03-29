import React from 'react'
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { useTranslation } from 'react-i18next'
import ReactedPostComponent from './ReactedComponents/ReactedPostComponent'
import ReactedMediaComponent from './ReactedComponents/ReactedMediaComponent'
import ReactedCommunityComponent from './ReactedComponents/ReactedCommunityComponent'
import ReactedLinkComponent from './ReactedComponents/ReactedLinkComponent'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'

export default function Reacteds({ data }: { data: NonNullable<GetterData<Array<Reacted>>> }) {
  const { t } = useTranslation('common')

  const Reacted = (
    <Container maxWidth="md">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { t('found', {
            count: data.data.length,
            entity: t('reactions', { count: data.data.length }).toLowerCase(),
            context: 'female',
          }) }

        </Typography>
      </Box>
      <Box my={ 2 }>
        { data.data.map((row, idx) => (
          <div>
            { row.entityType === 'post' && <ReactedPostComponent key={ idx.toString() } data={ row }/> }
            { row.entityType === 'community' && <ReactedCommunityComponent key={ idx.toString() } data={ row }/> }
            { row.entityType === 'media' && <ReactedMediaComponent key={ idx.toString() } data={ row }/> }
            { row.entityType === 'externalLink' && <ReactedLinkComponent key={ idx.toString() } data={ row }/> }
            <br/>
          </div>
        )) }
      </Box>
    </Container>
  )

  return (
    <AutoTabs
      tabs={ [
        { label: t('stat'), icon: <Timeline/> },
        { label: t('list'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.REACTED }/>,
        Reacted,
      ] }
    />
  )
}
