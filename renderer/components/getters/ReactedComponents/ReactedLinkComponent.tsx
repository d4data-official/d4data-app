import React from 'react'
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Button } from '@material-ui/core'
import GenericReactionComponent from './GenericReactionComponent'
import openInBrowser from '../../../modules/openInBrowser'

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
})

export default function ReactedLinkComponent({ data }: { data: NonNullable<Reacted> }) {
  const classes = useStyles()

  return (
    <Card className={ classes.root } variant="outlined">
      <CardContent>
        <Typography className={ classes.title } variant="h5" component="h2">
          <span>
            A réagi à
            <Button variant="text" onClick={ () => openInBrowser(data.entity) }>un lien</Button>
          </span>
        </Typography>
      </CardContent>
      <div className={ classes.reactions }>
        <GenericReactionComponent reaction={ data.reaction }/>
      </div>
    </Card>
  )
}
