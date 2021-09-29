import React from 'react'
import { Post } from '@d4data/archive-lib/dist/src/types/schemas'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { List as ListIcon, Timeline } from '@material-ui/icons'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import PostComponent from './PostComponents/PostComponent'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'

const loadLimit = 47

export default function Posts({ data }: { data: NonNullable<GetterData<Array<Post>>> }) {
  const Posts = (
    <Container maxWidth="md">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { `${ data.data.slice(0, loadLimit).length } posts found` }
        </Typography>
      </Box>
      <Box my={ 2 }>
        { data.data.slice(0, loadLimit).map((row, idx) => (
          <div>
            <PostComponent key={ idx.toString() } data={ row }/>
            <br/>
          </div>
        )) }
      </Box>
    </Container>
  )

  return (
    <AutoTabs
      tabs={ [
        { label: 'Posts stat', icon: <Timeline/> },
        { label: 'Posts list', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.POSTS }/>,
        Posts,
      ] }
    />
  )
}
