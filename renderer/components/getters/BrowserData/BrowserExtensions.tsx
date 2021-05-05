import { Extension } from 'd4data-archive-lib/dist/src/types/schemas/BrowserData'
import { Box, Button, Checkbox, CheckboxProps, FormControlLabel, Paper, styled, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import openInBrowser from '../../../modules/openInBrowser'

export interface Props {
  data: Array<Extension>
}

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" { ...props } />)

const StyledCheckbox = styled(Checkbox)({
  padding: 0,
})

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

export default function BrowserExtensions({ data }: Props) {
  const classes = useStyles()

  return (
    <div>
      <Box padding={ 2 } display="flex" flexWrap="wrap">
        {
          data.map(({
            name,
            version,
            websiteUrl,
            enabled,
            incognitoEnabled,
          }) => (
            <Paper className={ classes.extensionCard }>
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
          ))
        }
      </Box>
    </div>
  )
}
