import { AnyAction } from 'redux';

export default function reducer(state = {}, action: AnyAction) {
  switch (action.type) {
    case 'SET': {
      return Object.assign(state, {
        [action.dataName]: action.data,
      });
    }
    case 'UNSET': {
      return Object.assign(state, {
        [action.dataName]: undefined,
      });
    }
    default: {
      return state;
    }
  }
}
