import {
  Box, Button, Checkbox, FormControlLabel, Paper, styled, Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Extension } from 'd4data-archive-lib/dist/src/types/schemas/BrowserData'
import openInBrowser from '../../../../modules/openInBrowser'

const useStyles = makeStyles((theme) => ({
  extensionCard: {
    height: 200,
    width: 300,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
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
            label="Enabled"
            control={ <StyledCheckbox checked={ enabled } color="primary"/> }
            style={ { margin: 0 } }
          />
        ) }
        { incognitoEnabled !== undefined && (
          <FormControlLabel
            label="Enabled in incognito"
            control={ <StyledCheckbox checked={ incognitoEnabled } color="primary"/> }
            style={ { margin: 0 } }
          />
        ) }
      </Box>

      { websiteUrl && (
        <Button onClick={ () => openInBrowser(websiteUrl) } variant="outlined" color="primary">
          Open
          website
        </Button>
      ) }
    </Paper>
  )
}
