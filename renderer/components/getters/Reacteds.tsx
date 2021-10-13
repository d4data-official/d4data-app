import React from 'react'
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import ReactedPostComponent from './ReactedComponents/ReactedPostComponent'
import ReactedMediaComponent from './ReactedComponents/ReactedMediaComponent'
import ReactedCommunityComponent from './ReactedComponents/ReactedCommunityComponent'
import ReactedLinkComponent from './ReactedComponents/ReactedLinkComponent'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'

const loadLimit = 114

export default function Reacteds({ data }: { data: NonNullable<GetterData<Array<Reacted>>> }) {
  const Reacted = (
    <Container maxWidth="md">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { `${ data.data.slice(0, loadLimit).length } reactions found` }
        </Typography>
      </Box>
      <Box my={ 2 }>
        { data.data.slice(0, loadLimit).map((row, idx) => (
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
        { label: 'Reacted stat', icon: <Timeline/> },
        { label: 'Reacted list', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.REACTED }/>,
        Reacted,
      ] }
    />
  )
}
