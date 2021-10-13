import { capitalize, Dialog, DialogContent, DialogProps, DialogTitle, Stack, Typography } from '@mui/material'
import { ToggleButton, ToggleButtonGroup } from '@mui/lab'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import Brightness3Icon from '@mui/icons-material/Brightness3'
import ListIcon from '@mui/icons-material/List'
import CodeIcon from '@mui/icons-material/Code'
import React, { useCallback, useContext } from 'react'
import { GlobalContext } from '../context/Store'

export interface Props {
  open: boolean
  onClose?: DialogProps['onClose']
}

const DIALOG_TITLE = 'Settings'

export default function AppSettingsDialog({ open, onClose }: Props) {
  const { currentTheme, rawData, dispatch } = useContext(GlobalContext)

  const handleThemeChange = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' })
  }, [])

  const handleDataDisplayModeChange = useCallback(() => {
    dispatch({ type: 'TOGGLE_RAWDATA' })
  }, [])

  return (
    <Dialog
      open={ open }
      onClose={ onClose }
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={ {
          textAlign: 'center',
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        } }
      >
        { DIALOG_TITLE }
      </DialogTitle>

      <DialogContent sx={ { p: 0 } }>
        <Stack spacing={ 2 } sx={ { p: 2 } }>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">
              Theme: { capitalize(currentTheme) }
            </Typography>

            <ToggleButtonGroup
              value={ currentTheme }
              exclusive
              onChange={ handleThemeChange }
            >
              <ToggleButton value="light" aria-label="light">
                <WbSunnyIcon/>
              </ToggleButton>

              <ToggleButton value="dark" aria-label="dark">
                <Brightness3Icon/>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">
              Display type: { rawData ? 'Raw Data' : 'Ergonomic Display' }
            </Typography>

            <ToggleButtonGroup
              value={ rawData }
              exclusive
              onChange={ handleDataDisplayModeChange }
            >
              <ToggleButton value={ false } aria-label="light">
                <ListIcon/>
              </ToggleButton>

              <ToggleButton value aria-label="dark">
                <CodeIcon/>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
