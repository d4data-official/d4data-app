import React from 'react';
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { Post } from '@d4data/archive-lib/dist/src/types/schemas'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PostComponent from './PostComponents/PostComponent'

const loadLimit = 47

export default function Posts({ data }: { data: NonNullable<GetterData<Array<Post>>> }) {
  return (
    <Container maxWidth="md">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { `${ data.data.slice(0, loadLimit).length } posts found` }
        </Typography>
      </Box>
      <Box my={ 2 }>
        {data.data.slice(0, loadLimit).map((row, idx) => (
          <div>
            <PostComponent key={ idx.toString() } data={ row } />
            <br/>
          </div>
        ))}
      </Box>
    </Container>
  );
}
