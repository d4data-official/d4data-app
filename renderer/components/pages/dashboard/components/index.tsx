import { FunctionComponent } from 'react'
import DefaultDisplay from './DefaultDisplay'
import Contacts from '../../../getters/Contacts'
import Followings from '../../../getters/Followings'
import Profile from '../../../getters/Profile'

interface ComponentProps {
  data: any
}

export const ComponentList: [string, FunctionComponent<ComponentProps>][] = [
  [
    'APIs',
    DefaultDisplay,
  ],
  [
    'AuthorizedDevices',
    DefaultDisplay,
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
    DefaultDisplay,
  ],
  [
    'Communities',
    DefaultDisplay,
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
    DefaultDisplay,
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
    DefaultDisplay,
  ],
  [
    'Profile',
    Profile,
  ],
  [
    'Reacted',
    DefaultDisplay,
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
    DefaultDisplay,
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
