import { FunctionComponent } from 'react'
import DefaultDisplay from './DefaultDisplay'
import Profile from '../../../getters/Profile'
import Whereabouts from './whereabouts/Whereabouts';
import TaskLists from './taskList/TaskLists';
import Connexions from './connexions/Connexions';

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
    Connexions,
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
    TaskLists,
  ],
  [
    'Transactions',
    DefaultDisplay,
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
