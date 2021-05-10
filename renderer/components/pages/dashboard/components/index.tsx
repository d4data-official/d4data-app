import { FunctionComponent } from 'react'
import DefaultDisplay from './DefaultDisplay'
import Profile from '../../../getters/Profile'
import APIs from '../../../getters/APIs'

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
    DefaultDisplay,
  ],
  [
    'Followings',
    DefaultDisplay,
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
