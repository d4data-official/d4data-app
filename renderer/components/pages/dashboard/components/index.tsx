import { FunctionComponent } from 'react'
import DefaultDisplay from './DefaultDisplay'
import Contacts from '../../../getters/Contacts'
import Followings from '../../../getters/Followings'
import Profile from '../../../getters/Profile'
import Mails from '../../../getters/Mails'
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
