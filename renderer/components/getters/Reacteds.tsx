import React from 'react';
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ReactedPostComponent from './ReactedComponents/ReactedPostComponent';
import ReactedMediaComponent from './ReactedComponents/ReactedMediaComponent';
import ReactedCommunityComponent from './ReactedComponents/ReactedCommunityComponent';
import ReactedLinkComponent from './ReactedComponents/ReactedLinkComponent';

export default function Reacteds({ data }: { data: NonNullable<GetterData<Array<Reacted>>> }) {
  return (
    <Container maxWidth="md">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { `${ data.data.length } reactions found` }
        </Typography>
      </Box>
      <Box my={ 2 }>
        {data.data.slice(0, 100).map((row, idx) => (
          <div>
            { row.entityType === 'post' && <ReactedPostComponent key={ idx.toString() } data={ row } />}
            { row.entityType === 'community' && <ReactedCommunityComponent key={ idx.toString() } data={ row } />}
            { row.entityType === 'media' && <ReactedMediaComponent key={ idx.toString() } data={ row } />}
            { row.entityType === 'externalLink' && <ReactedLinkComponent key={ idx.toString() } data={ row } />}
            <br/>
          </div>
        ))}
      </Box>
    </Container>
  );
}
