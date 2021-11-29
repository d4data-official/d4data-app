import { Box, Button, Checkbox, FormControlLabel, Paper, Typography } from '@mui/material'
import { makeStyles, styled } from '@mui/styles'
import { Extension } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { useTranslation } from 'react-i18next'
import openInBrowser from '../../../../modules/openInBrowser'

const useStyles = makeStyles((theme) => ({
  extensionCard: {
    height: 200,
    width: 300,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  version: {
    color: 'grey',
  },
}))

const StyledCheckbox = styled(Checkbox)({
  padding: 0,
})

export default function ExtensionCard({
  data: {
    name,
    version,
    websiteUrl,
    enabled,
    incognitoEnabled,
  },
}: { data: Extension }) {
  const { t } = useTranslation(['common', 'ExtensionCard'])

  const classes = useStyles()

  return (
    <Paper className={ classes.extensionCard } key={ name }>
      <div>
        <Typography variant="h5" className={ classes.name } noWrap>{ name }</Typography>
        { version && (
          <div>
            <span>v</span>
            { version }
          </div>
        ) }
      </div>

      <Box display="flex" flexDirection="column">
        { enabled !== undefined && (
          <FormControlLabel
            label={ t('common:enabled') }
            control={ <StyledCheckbox checked={ enabled } color="primary" disabled/> }
            style={ { margin: 0 } }
          />
        ) }
        { incognitoEnabled !== undefined && (
          <FormControlLabel
            label={ t('ExtensionCard:enabledIncognito') }
            control={ <StyledCheckbox checked={ incognitoEnabled } color="primary" disabled/> }
            style={ { margin: 0 } }
          />
        ) }
      </Box>

      { websiteUrl && (
        <Button onClick={ () => openInBrowser(websiteUrl) } variant="outlined" color="primary">
          { t('common:openWebsite') }
        </Button>
      ) }
    </Paper>
  )
}
