import { FunctionComponent } from 'react'
import DefaultDisplay from './DefaultDisplay'
import Profile from '../../../getters/Profile'
import Medias from '../../../getters/Medias'
import Posts from '../../../getters/Posts'
import Reacteds from '../../../getters/Reacteds'

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
    Posts,
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
