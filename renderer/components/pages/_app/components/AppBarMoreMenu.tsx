import { usePopupState } from 'material-ui-popup-state/hooks'
import { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import GitHubIcon from '@mui/icons-material/GitHub'
import WebIcon from '@mui/icons-material/Web'
import { useTranslation } from 'react-i18next'
import { version } from '../../../../../package.json'
import openInBrowser from '../../../../modules/openInBrowser'

export default function AppBarMoreMenu() {
  const { t } = useTranslation('utils')

  const popupState = usePopupState({ variant: 'popover', popupId: 'header-menu' })

  const goToGithubRelease = () => openInBrowser(
    `https://github.com/d4data-official/d4data-app/releases/tag/v${ version }`,
  )
  const goToD4dataWebsite = () => openInBrowser('https://d4data.org')
  const goToGithub = () => openInBrowser('https://github.com/d4data-official')

  return (
    <>
      <IconButton { ...bindTrigger(popupState) } sx={ { color: 'white' } }>
        <MoreVertIcon/>
      </IconButton>

      <Menu { ...bindMenu(popupState) }>
        <MenuItem onClick={ goToD4dataWebsite }>
          <ListItemIcon>
            <WebIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>{ t('website') }</ListItemText>
        </MenuItem>

        <MenuItem onClick={ goToGithub }>
          <ListItemIcon>
            <GitHubIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>{ t('sources') }</ListItemText>
        </MenuItem>

        <MenuItem onClick={ goToGithubRelease }>
          <ListItemText>{ t('version', { version }) }</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
