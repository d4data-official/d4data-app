import { usePopupState } from 'material-ui-popup-state/hooks'
import { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import GitHubIcon from '@material-ui/icons/GitHub'
import WebIcon from '@material-ui/icons/Web'
import { version } from '../../../../../package.json'
import openInBrowser from '../../../../modules/openInBrowser'

export default function AppBarMoreMenu() {
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
          <ListItemText>Website</ListItemText>
        </MenuItem>

        <MenuItem onClick={ goToGithub }>
          <ListItemIcon>
            <GitHubIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Source code</ListItemText>
        </MenuItem>

        <MenuItem onClick={ goToGithubRelease }>
          <ListItemText>Version { version }</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
