import React from 'react'
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Link } from '@mui/material'
import { Post } from '@d4data/archive-lib'
import { useTranslation } from 'react-i18next'
import GenericReactionComponent from './GenericReactionComponent'
import getDurationFromNow from '../../../modules/getDurationFromNow'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '10px 20px',
  },
  description: {
    marginBottom: 12,
  },
  reactions: {
    marginLeft: 15,
    marginBottom: 10,
  },
})

export default function ReactedPostComponent({ data }: { data: NonNullable<Reacted> }) {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const entity = data.entity as Post

  return (
    <Card className={ classes.root } variant="outlined">
      <CardContent>
        { entity.title && <Typography variant="h5" component="h2">{ entity.title }</Typography> }

        { entity.sender && <Typography>{ t('common:sentBy', { sender: entity.sender }) }</Typography> }

        { entity.creationDate && (
          <Typography variant="caption" color="textSecondary">
            { t('common:ago', { time: getDurationFromNow(entity.creationDate).humanize() }) }
          </Typography>
        ) }

        { entity.content && (
          <Typography className={ classes.description } variant="body1" component="p">
            { entity.content }
          </Typography>
        ) }

        { entity.metaData?.links && (
          <Typography className={ classes.description } variant="body2" component="p">
            { entity.metaData.links.map((link: string) => <Link href={ link }>{ link }</Link>) }
          </Typography>
        ) }
      </CardContent>
      <div className={ classes.reactions }>
        <GenericReactionComponent reaction={ data.reaction }/>
      </div>
    </Card>
  )
}
