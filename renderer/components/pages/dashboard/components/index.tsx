import { FunctionComponent } from 'react'
import Chats from 'components/getters/Chats'
import DefaultDisplay from './DefaultDisplay'
import Contacts from '../../../getters/Contacts'
import Followings from '../../../getters/Followings'
import Profile from '../../../getters/Profile'
import Connections from '../../../getters/Connections';
import Whereabouts from '../../../getters/Whereabouts';
import Tasks from '../../../getters/Tasks';
import Mails from '../../../getters/Mails'
import Notes from '../../../getters/Notes'
import Communities from '../../../getters/Communities'
import AuthorizedDevices from '../../../getters/AuthorizedDevices'
import APIs from '../../../getters/APIs'
import Transactions from '../../../getters/Transactions'
import Medias from '../../../getters/Medias'
import Posts from '../../../getters/Posts'
import Reacteds from '../../../getters/Reacteds'
import BrowserData from '../../../getters/BrowserData'

interface ComponentProps {
  data: any
}

export const ComponentList: [string, FunctionComponent<ComponentProps>][] = [
  [
    'APIs',
    APIs,
  ],
  [
    'AuthorizedDevices',
    AuthorizedDevices,
  ],
  [
    'BrowserData',
    BrowserData,
  ],
  [
    'Chats',
    Chats,
  ],
  [
    'Comments',
    Posts,
  ],
  [
    'Communities',
    Communities,
  ],
  [
    'Connections',
    Connections,
  ],
  [
    'Contacts',
    Contacts,
  ],
  [
    'Followings',
    Followings,
  ],
  [
    'Mails',
    Mails,
  ],
  [
    'Medias',
    Medias,
  ],
  [
    'Messages',
    DefaultDisplay,
  ],
  [
    'Notifications',
    DefaultDisplay,
  ],
  [
    'Notes',
    Notes,
  ],
  [
    'Posts',
    Posts,
  ],
  [
    'Profile',
    Profile,
  ],
  [
    'Reacted',
    Reacteds,
  ],
  [
    'Settings',
    DefaultDisplay,
  ],
  [
    'Tasks',
    Tasks,
  ],
  [
    'Transactions',
    Transactions,
  ],
  [
    'Whereabouts',
    Whereabouts,
  ],
]

export const fetchComponent = (componentName: string) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [, Component] = ComponentList.find(([component]) => componentName === component) ?? []
  return Component ?? null
}
