import { Contact } from '@d4data/archive-lib/src/types/schemas'

export default function getInitialsFromContact({ firstName, lastName, displayName }: Contact) {
  const initials = []
  const [, displayLastName] = displayName.split(' ')

  initials[0] = firstName?.charAt(0)
      ?? displayName?.charAt(0)
      ?? ''
  initials[1] = lastName?.charAt(0)
      ?? (!firstName && displayLastName?.charAt(0))
      ?? ''

  return initials.join('')
}
