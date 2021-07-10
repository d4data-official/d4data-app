import React from 'react'
import moment from 'moment'
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
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
  pos: {
    fontSize: 10,
  },
})

export default function ReactedCommunityComponent({ data }: { data: NonNullable<Reacted> }) {
  const classes = useStyles()

  return (
    <Card className={ classes.root } variant="outlined">
      <CardContent>
        <Typography className={ classes.title } variant="h5" component="h2">
          <span>
            A réagi sur la communauté { data.entity.name }
          </span>
        </Typography>
        <Typography className={ classes.pos } color="textSecondary">
          { data.entity.joinedDate
          // eslint-disable-next-line no-mixed-operators
          && `${ moment.duration(data.entity.joinedDate?.valueOf() / 10).humanize() } ago` || 'No date provided' }
        </Typography>
      </CardContent>
      <div className={ classes.reactions }>
        <GenericReactionComponent reaction={ data.reaction }/>
      </div>
    </Card>
  )
}
