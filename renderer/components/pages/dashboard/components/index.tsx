import { FunctionComponent } from 'react'
import DefaultDisplay from './DefaultDisplay'
import Contacts from '../../../getters/Contacts'
import Followings from '../../../getters/Followings'
import Profile from '../../../getters/Profile'
import Whereabouts from '../../../getters/Whereabouts';
import Tasks from '../../../getters/Tasks';
import Connections from '../../../getters/Connections';
import Notes from '../../../getters/Notes'
import Communities from '../../../getters/Communities'
import AuthorizedDevices from '../../../getters/AuthorizedDevices'
import APIs from '../../../getters/APIs'
import Transactions from '../../../getters/Transactions'
import Medias from '../../../getters/Medias'
import Posts from '../../../getters/Posts'
import Reacteds from '../../../getters/Reacteds'

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
    DefaultDisplay,
  ],
  [
    'Chats',
    DefaultDisplay,
  ],
  [
    'ChatMessages',
    DefaultDisplay,
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
    DefaultDisplay,
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
  return Component
}
