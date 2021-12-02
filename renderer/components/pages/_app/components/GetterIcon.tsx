import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import PinDropIcon from '@mui/icons-material/PinDrop'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatIcon from '@mui/icons-material/Chat'
import ForumIcon from '@mui/icons-material/Forum'
import CommentIcon from '@mui/icons-material/Comment'
import LinkIcon from '@mui/icons-material/Link'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import GroupsIcon from '@mui/icons-material/Groups'
import SettingsIcon from '@mui/icons-material/Settings'
import RecommendIcon from '@mui/icons-material/Recommend'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import PaidIcon from '@mui/icons-material/Paid'
import LanguageIcon from '@mui/icons-material/Language'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PhonelinkIcon from '@mui/icons-material/Phonelink'
import EmailIcon from '@mui/icons-material/Email'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { SvgIconProps } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface Props {
  getter: Getters
  iconProps?: SvgIconProps
}

const GETTERS_ICON: Record<Getters, OverridableComponent<any> | undefined> = {
  [Getters.PROFILE]: PersonIcon,
  [Getters.FRIENDS]: PeopleIcon,
  [Getters.FOLLOWINGS]: SupervisedUserCircleIcon,
  [Getters.FOLLOWERS]: SupervisedUserCircleIcon,
  [Getters.CONTACTS]: PeopleIcon,
  [Getters.WHEREABOUTS]: PinDropIcon,
  [Getters.NOTIFICATIONS]: NotificationsIcon,
  [Getters.CHATS]: ChatIcon,
  [Getters.COMMENTS]: ForumIcon,
  [Getters.POSTS]: CommentIcon,
  [Getters.MESSAGES]: ChatIcon,
  [Getters.APIS]: LinkIcon,
  [Getters.CONNECTIONS]: VpnKeyIcon,
  [Getters.COMMUNITIES]: GroupsIcon,
  [Getters.SETTINGS]: SettingsIcon,
  [Getters.REACTED]: RecommendIcon,
  [Getters.MEDIAS]: PhotoLibraryIcon,
  [Getters.NOTES]: NoteAltIcon,
  [Getters.TRANSACTIONS]: PaidIcon,
  [Getters.BROWSER_DATA]: LanguageIcon,
  [Getters.TASKS]: AssignmentIcon,
  [Getters.AUTHORIZED_DEVICES]: PhonelinkIcon,
  [Getters.MAIL]: EmailIcon,
  [Getters.EVENTS]: NotificationsNoneIcon,
  [Getters.CHAT_MESSAGES]: undefined,
}

export default function GetterIcon({ getter, iconProps }: Props) {
  const Icon = GETTERS_ICON[getter]

  if (!Icon) {
    return <></>
  }

  return <Icon { ...iconProps }/>
}
