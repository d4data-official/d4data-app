import React from 'react';
import moment from 'moment';
import { Post } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';
import openInBrowser from '../../../modules/openInBrowser';
import ReactionsComponent from './ReactionsComponent'
import DisabledReactionsComponent from './DisabledReactionsComponent'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '10px 20px',
  },
  title: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 12,
  },
  pos: {
    fontSize: 10,
  },
  reactions: {
    width: '100%',
    marginBottom: 10,
  },
});

export default function PostComponent({ data }: { data: NonNullable<Post> }) {
  const classes = useStyles();

  return (
    <Card className={ classes.root } variant="outlined">
      <CardContent>
        <Typography className={ classes.title } variant="h5" component="h2">
          { data.title
            ?? (
            <span>
              A publié
              <Button variant="text" onClick={ () => openInBrowser(data.metaData?.links?.[0]) }>un lien</Button>
            </span>
            )
            ?? (
            <span>
              A publié
              <Button variant="text" onClick={ () => openInBrowser(data.metaData?.links?.[0]) }>un média</Button>
            </span>
            )
            ?? 'No title provided'}
        </Typography>
        <Typography className={ classes.description } variant="body2" component="p">
          { data.description ?? 'No description provided' }
        </Typography>
        <Typography className={ classes.pos } color="textSecondary">
          Sent by { data.sender ?? 'Unknown' }
          {' '}
          { data.creationDate && `${ moment.duration(data.creationDate.valueOf() / 10).humanize() } ago` }
        </Typography>
      </CardContent>
      <div className={ classes.reactions }>
        { data.metaData?.reactions
          ? <ReactionsComponent data={ data.metaData?.reactions } />
          : <DisabledReactionsComponent/>}
      </div>
    </Card>
  )
}
