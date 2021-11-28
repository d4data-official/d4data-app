import React from 'react'
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTranslation } from 'react-i18next'
import { Community } from '@d4data/archive-lib'
import GenericReactionComponent from './GenericReactionComponent'
import getDurationFromNow from '../../../modules/getDurationFromNow'

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
})

export default function ReactedCommunityComponent({ data }: { data: NonNullable<Reacted> }) {
  const { t } = useTranslation(['common', 'pages'])
  const classes = useStyles()
  const entity = data.entity as Community

  return (
    <Card className={ classes.root } variant="outlined">
      <CardContent>
        <Typography className={ classes.title } variant="h5" component="h2">
          { t('pages:reacted.ReactedCommunityComponent.title', { name: entity.name }) }
        </Typography>

        { entity.joinedDate && (
          <Typography variant="caption" color="textSecondary">
            { t('common:ago', { time: getDurationFromNow(entity.joinedDate).humanize() }) }
          </Typography>
        ) }
      </CardContent>
      <div className={ classes.reactions }>
        <GenericReactionComponent reaction={ data.reaction }/>
      </div>
    </Card>
  )
}
