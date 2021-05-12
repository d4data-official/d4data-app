import React from 'react';
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GenericReactionComponent from './GenericReactionComponent'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '10px 20px',
  },
  title: {
    marginBottom: 10,
  },
  reactions: {
    marginLeft: 15,
    marginBottom: 10,
  },
  modalImage: {
    maxWidth: 250,
  },
});

export default function ReactedMediaComponent({ data }: { data: NonNullable<Reacted> }) {
  const classes = useStyles();

  return (
    <Card className={ classes.root } variant="outlined">
      <CardContent>
        <Typography className={ classes.title } variant="h5" component="h2">
          A réagi à un media
          <div className={ classes.modalImage }>
            <img src={ data.entity.url } alt=""/>
          </div>
        </Typography>
      </CardContent>
      <div className={ classes.reactions }>
        <GenericReactionComponent reaction={ data.reaction } />
      </div>
    </Card>
  )
}