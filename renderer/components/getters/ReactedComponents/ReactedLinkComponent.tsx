import React from 'react'
import { Reacted } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import GenericReactionComponent from './GenericReactionComponent'
import openInBrowser from '../../../modules/openInBrowser'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '10px 20px',
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
  const { t } = useTranslation('pages')
  const classes = useStyles()
  const entity = data.entity as string

  return (
    <Card className={ classes.root } variant="outlined">
      <CardContent>
        <Stack mb={ 1 } direction="row" alignItems="center" justifyContent="space-between" spacing={ 1 }>
          <Typography variant="h5" component="h2">
            { t('reacted.ReactedLinkComponent.title') }
          </Typography>

          <Button variant="outlined" onClick={ () => openInBrowser(entity) }>
            { t('reacted.ReactedLinkComponent.openExternalLink') }
          </Button>
        </Stack>

        <Typography variant="caption" color="textSecondary">{ entity }</Typography>
      </CardContent>
      <div className={ classes.reactions }>
        <GenericReactionComponent reaction={ data.reaction }/>
      </div>
    </Card>
  )
}
