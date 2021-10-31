import { FunctionComponent } from 'react'
import Chats from 'components/getters/Chats'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import DefaultDisplay from './DefaultDisplay'
import Contacts from '../../../getters/Contacts'
import Followings from '../../../getters/Followings'
import Profile from '../../../getters/Profile'
import Connections from '../../../getters/Connections'
import Whereabouts from '../../../getters/Whereabouts'
import Tasks from '../../../getters/Tasks'
import Mails from '../../../getters/Mails'
import Notes from '../../../getters/Notes'
import Communities from '../../../getters/Communities'
import AuthorizedDevices from '../../../getters/AuthorizedDevices'
import APIs from '../../../getters/APIs'
import Settings from '../../../getters/Settings'
import Transactions from '../../../getters/Transactions'
import Medias from '../../../getters/Medias'
import Posts from '../../../getters/Posts'
import Reacteds from '../../../getters/Reacteds'
import BrowserData from '../../../getters/BrowserData'
import Friends from '../../../getters/Friends'
import Notifications from '../../../getters/Notifications'

interface ComponentProps {
  data: any
}

type GetterComponent = FunctionComponent<ComponentProps> & { disableRawData?: boolean }

export const ComponentList: Array<[Getters, GetterComponent]> = [
  [
    Getters.APIS,
    APIs,
  ],
  [
    Getters.AUTHORIZED_DEVICES,
    AuthorizedDevices,
  ],
  [
    Getters.BROWSER_DATA,
    BrowserData,
  ],
  [
    Getters.CHATS,
    Chats,
  ],
  [
    Getters.COMMENTS,
    Posts,
  ],
  [
    Getters.COMMUNITIES,
    Communities,
  ],
  [
    Getters.CONNECTIONS,
    Connections,
  ],
  [
    Getters.FRIENDS,
    Friends,
  ],
  [
    Getters.CONTACTS,
    Contacts,
  ],
  [
    Getters.FOLLOWINGS,
    Followings,
  ],
  [
    Getters.MAIL,
    Mails,
  ],
  [
    Getters.MEDIAS,
    Medias,
  ],
  [
    Getters.MESSAGES,
    DefaultDisplay,
  ],
  [
    Getters.NOTIFICATIONS,
    Notifications,
  ],
  [
    Getters.NOTES,
    Notes,
  ],
  [
    Getters.POSTS,
    Posts,
  ],
  [
    Getters.PROFILE,
    Profile,
  ],
  [
    Getters.REACTED,
    Reacteds,
  ],
  [
    Getters.SETTINGS,
    Settings,
  ],
  [
    Getters.TASKS,
    Tasks,
  ],
  [
    Getters.TRANSACTIONS,
    Transactions,
  ],
  [
    Getters.WHEREABOUTS,
    Whereabouts,
  ],
]

export const fetchComponent = (componentName: string): GetterComponent | null => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [, Component] = ComponentList.find(([component]) => componentName === component) ?? []
  return Component ?? null
}
