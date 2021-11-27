import {
  capitalize,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import Brightness3Icon from '@mui/icons-material/Brightness3'
import ListIcon from '@mui/icons-material/List'
import CodeIcon from '@mui/icons-material/Code'
import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { GlobalContext } from '../context/Store'
import useDataCollectUserContent from '../hooks/swr/useDataCollectUserContent'
import moment from 'moment'

export const AVAILABLE_LANGUAGES: Array<{ key: string, name: string }> = [
  { key: 'en', name: 'English' },
  { key: 'fr', name: 'Français' },
]

export interface Props {
  open: boolean
  onClose?: DialogProps['onClose']
}

export default function AppSettingsDialog({ open, onClose }: Props) {
  const { t, i18n } = useTranslation('settings')

  const { currentTheme, rawData, dispatch } = useContext(GlobalContext)
  const { dataCollectUserContent, setDataCollectUserContent } = useDataCollectUserContent()

  const handleThemeChange = useCallback(() => dispatch({ type: 'TOGGLE_THEME' }), [])
  const handleDataDisplayModeChange = useCallback(() => dispatch({ type: 'TOGGLE_RAWDATA' }), [])
  const handleLanguageChange = useCallback((langKey: string) => {
    i18n.changeLanguage(langKey)
    moment.locale(langKey)
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
        { t('title') }
      </DialogTitle>

      <DialogContent sx={ { p: 0 } }>
        <Stack spacing={ 2 } sx={ { p: 2 } }>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{ t('theme') }: { capitalize(currentTheme) }</Typography>

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
            <Typography variant="h5">{ t('display') }: { rawData ? t('raw') : t('ergonomic') }</Typography>

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

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">{ t('language') } </Typography>

            <Select
              value={ i18n.language.slice(0, 2) }
              onChange={ (event) => handleLanguageChange(event.target.value) }
              size="small"
            >
              { AVAILABLE_LANGUAGES.map((lang) => (
                <MenuItem value={ lang.key } key={ lang.key }>{ lang.name }</MenuItem>
              )) }
            </Select>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">{ t('dataCollectUserConsent') } </Typography>

            <Switch
              checked={ !!dataCollectUserContent }
              onChange={ ((event, checked) => setDataCollectUserContent(checked)) }
            />
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
