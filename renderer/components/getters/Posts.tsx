import React from 'react'
import { Post } from '@d4data/archive-lib/dist/src/types/schemas'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { useTranslation } from 'react-i18next'
import PostComponent from './PostComponents/PostComponent'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'

const loadLimit = 47

export default function Posts({ data }: { data: NonNullable<GetterData<Array<Post>>> }) {
  const { t } = useTranslation('common')

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
        { label: t('stat'), icon: <Timeline/> },
        { label: t('list'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.POSTS }/>,
        Posts,
      ] }
    />
  )
}
