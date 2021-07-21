import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import Case from 'case'

export default function getGetterLabel(getter: Getters) {
  switch (getter) {
    case Getters.APIS:
      return 'Linked applications'
    default:
      return Case.capital(getter).replace('Get ', '')
  }
}
