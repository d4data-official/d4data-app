import { FunctionComponent } from 'react'
import DefaultDisplay from './DefaultDisplay'

interface ComponentProps {
  data: any
}

export const ComponentList: [string, FunctionComponent<ComponentProps>][] = [
  ['APIs',
    DefaultDisplay,
  ],
  ['AuthorizedDevices',
    DefaultDisplay,
  ],
  ['BrowserDatas',
    DefaultDisplay,
  ],
  ['Chats',
    DefaultDisplay,
  ],
  ['ChatMessages',
    DefaultDisplay,
  ],
  ['Comments',
    DefaultDisplay,
  ],
  ['Communities',
    DefaultDisplay,
  ],
  ['Connections',
    DefaultDisplay,
  ],
  ['Contacts',
    DefaultDisplay,
  ],
  ['Followings',
    DefaultDisplay,
  ],
  ['Mails',
    DefaultDisplay,
  ],
  ['Medias',
    DefaultDisplay,
  ],
  ['Messages',
    DefaultDisplay,
  ],
  ['Notifications',
    DefaultDisplay,
  ],
  ['Posts',
    DefaultDisplay,
  ],
  ['Profiles',
    DefaultDisplay,
  ],
  ['Reacteds',
    DefaultDisplay,
  ],
  ['Settings',
    DefaultDisplay,
  ],
  ['Tasks',
    DefaultDisplay,
  ],
  ['Transactions',
    DefaultDisplay,
  ],
  ['Whereabouts',
    DefaultDisplay,
  ],
]

export const fetchComponent = (componentName: string) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [, Component] = ComponentList.find(([component]) => componentName === component)
  return Component
}