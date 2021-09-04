import {
  capitalize, Dialog, DialogContent, DialogProps, DialogTitle, MenuItem, Select, Stack,
  Typography,
} from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import ListIcon from '@material-ui/icons/List'
import CodeIcon from '@material-ui/icons/Code'
import React, { useCallback, useContext } from 'react'
import Trans, { useTranslation } from './Translate';
import { GlobalContext, availableLanguages } from '../context/Store'

export interface Props {
  open: boolean
  onClose?: DialogProps['onClose']
}

export default function AppSettingsDialog({ open, onClose }: Props) {
  const { currentTheme, rawData, language, dispatch } = useContext(GlobalContext)
  const translate = useTranslation();

  const handleThemeChange = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' })
  }, [])

  const handleDataDisplayModeChange = useCallback(() => {
    dispatch({ type: 'TOGGLE_RAWDATA' })
  }, [])

  const handleLanguageChange = useCallback((newLanguage) => () => {
    dispatch({ type: 'UPDATE_LANGUAGE', language: newLanguage })
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
        <Trans page="settings" section="title" />
      </DialogTitle>

      <DialogContent sx={ { p: 0 } }>
        <Stack spacing={ 2 } sx={ { p: 2 } }>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">
              <Trans page="settings" section="theme" />: {capitalize(currentTheme)}
            </Typography>

            <ToggleButtonGroup
              value={ currentTheme }
              exclusive
              onChange={ handleThemeChange }
            >
              <ToggleButton value="light" aria-label="light">
                <WbSunnyIcon />
              </ToggleButton>

              <ToggleButton value="dark" aria-label="dark">
                <Brightness3Icon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">
              <Trans page="settings" section="display" />: {
              rawData ? translate('settings', 'raw') : translate('settings', 'ergonomic')
            }
            </Typography>

            <ToggleButtonGroup
              value={ rawData }
              exclusive
              onChange={ handleDataDisplayModeChange }
            >
              <ToggleButton value={ false } aria-label="light">
                <ListIcon />
              </ToggleButton>

              <ToggleButton value aria-label="dark">
                <CodeIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">
              <Trans page="settings" section="language" />: {language.name}
            </Typography>

            <Select defaultValue={ language.key } >
              {availableLanguages.map((lang) => (
                <MenuItem key={ lang.key } value={ lang.key } onClick={ handleLanguageChange(lang) }>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
