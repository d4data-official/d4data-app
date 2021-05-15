import { FunctionComponent } from 'react'
import Chats from '../../../getters/Chats'
import DefaultDisplay from './DefaultDisplay'
import Contacts from '../../../getters/Contacts'
import Followings from '../../../getters/Followings'
import Profile from '../../../getters/Profile'
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
    DefaultDisplay,
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
    DefaultDisplay,
  ],
  [
    'Transactions',
    Transactions,
  ],
  [
    'Whereabouts',
    DefaultDisplay,
  ],
]

export const fetchComponent = (componentName: string) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [, Component] = ComponentList.find(([component]) => componentName === component) ?? []
  return Component
}
