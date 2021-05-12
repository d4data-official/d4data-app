import React from 'react';
import moment from 'moment';
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';
import GenericReactionComponent from './GenericReactionComponent'
import openInBrowser from '../../../modules/openInBrowser';

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
    marginLeft: 15,
    marginBottom: 10,
  },
});

export default function ReactedPostComponent({ data }: { data: NonNullable<Reacted> }) {
  const classes = useStyles();

  return (
    <Card className={ classes.root } variant="outlined">
      <CardContent>
        <Typography className={ classes.title } variant="h5" component="h2">
          { data.entity.title
          ?? (data.entity.metaData?.links?.[0] && (
            <span>
              A réagi à un lien
              <Button variant="text" onClick={ () => openInBrowser(data.entity.metaData?.links?.[0]) }>un lien</Button>
            </span>
          ))
            ?? (data.entity.metaData?.medias?.[0] && (
            <span>
              A réagi à un média
              <Button
                variant="text"
                onClick={ () => openInBrowser(data.entity.metaData?.medias?.[0]) }
              >
                un média
              </Button>
            </span>
            ))
            ?? 'No title provided'}
        </Typography>
        <Typography className={ classes.pos } color="textSecondary">
          { data.entity.sender && `Sent by ${ data.entity.ender }`}
          { data.entity.creationDate
          // eslint-disable-next-line no-mixed-operators
          && `${ moment.duration(data.entity.creationDate?.valueOf() / 10).humanize() } ago` || 'No date provided'}
        </Typography>
      </CardContent>
      <div className={ classes.reactions }>
        <GenericReactionComponent reaction={ data.reaction } />
      </div>
    </Card>
  )
}
